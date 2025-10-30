import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pkg from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import {RegisterModel} from './db.js';
import {email_template} from './TemplateEmail.js';
import {email_template_eng} from './TemplateEmailEng.js';
import {email_template_student} from './TemplateEmail_student.js';
import {email_template_eng_student} from './TemplateEmailEng_student.js';

import { generatePDF_freePass, generateQRDataURL, generatePDFInvoice, generatePDFInvoice_energynight } from './generatePdf.js';
import PDFDocument from 'pdfkit';
import { Resend } from "resend";

const { json } = pkg
const app = express()
app.use(json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS.split(',')

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

const PORT = process.env.PORT || 3010
const environment = process.env.ENVIRONMENT || "sandbox";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url =
  environment === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";


const resend = new Resend(process.env.RESEND_APIKEY)

app.get('/check-user-visit', async (req, res) => {
    const { email } = req.query;
    const user = await RegisterModel.get_user_visit_last_fair(email);
    if (user) {
        return res.status(200).send(user);
    } else {
        return res.status(404).send({ message: 'No se encontró el usuario' });
    }
});

app.post('/create-order-replus', async (req, res) => {
    const { body } = req;
    let total = 0;

    // Check if the items are unique
    const ids = [];        
    body.items.forEach((item) => {
        if (ids.includes(item.id)) {                
            return res.status(500).send({
                status: false,
                message: 'Tu compra no pudo ser procesada, la información no es válida...'
            });
        } else {
            ids.push(item.id); // Add unique id to the list
        }
    });

    const get_products = await RegisterModel.get_products();

    if (!get_products.status) {
        return res.status(500).send({
            status: false,
            message: 'No se encontraron productos...'
        });
    }

    const products = get_products.result;
    
    body.items.forEach(item => {
        const product = products.find(product => product.id == item.id);
        if (!product) {
            return res.status(500).send({
                status: false,
                message: 'Error producto no encontrado...'
            });
        }
    
        let productPrice = product.price; // Precio base del producto
    
        // Verificar si el producto con id 2 está en la compra
        const energyDrinkExists = body.items.some(i => i.id == 2);
        const discountableProducts = [3, 4, 5];
    
        // Aplicar descuento si el producto es 3, 4 o 5 y el producto 2 está en la lista
        if (energyDrinkExists && discountableProducts.includes(item.id)) {
            productPrice = Math.max(productPrice - 500, 0); // Evita precios negativos
        }
    
        total += productPrice; // Sumar el precio al total
    });
    
    if (total !== body.total) {
        return res.status(400).send({
            status: false,
            message: 'Tu compra no pudo ser procesada, la información no es válida...'
        });
    }
    
    get_access_token()
        .then((access_token) => {
            let order_data_json = {
                intent: "CAPTURE",
                purchase_units: [
                {
                    amount: {
                    currency_code: "MXN",
                    value: total,
                    },
                    description: "Replus Ecommerce 2026",
                },
                ],
            };
            const data = JSON.stringify(order_data_json);

            fetch(endpoint_url + "/v2/checkout/orders", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
                },
                body: data,
            })
                .then((res) => res.json())
                .then((json) => {
                console.log(json);
                res.send(json);
                }); //Send minimal data to client
            })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
    });            
});

app.post("/complete-order", async (req, res) => {
  const { body } = req;
  try {
    const userResponse = await RegisterModel.get_user_by_id(body.idUser);
    console.log(userResponse);
    if (!userResponse.status) {
      return res.status(404).send({
        message: userResponse.error,
      });
    }

    const access_token = await get_access_token();
    const response = await fetch(
      endpoint_url + "/v2/checkout/orders/" + req.body.orderID + "/capture",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const id_items = body.items.map(item => item.id)

    // buscar el id del cupon de descuento si existe
    const discountItem = body.items?.find((item) => item?.isDiscount);
    const id_code = discountItem ? discountItem.id : null;

    const json = await response.json();
    console.log(JSON.stringify(json));
    if (json.id) {
      if (
        json.purchase_units[0].payments.captures[0].status === "COMPLETED" ||
        json.purchase_units[0].payments.captures[0].status === "PENDING"
      ) {
        const paypal_id_order = json.id;
        const paypal_id_transaction =
          json.purchase_units[0].payments.captures[0].id;
        await RegisterModel.save_order(
          body.idUser,
          id_items,
          body.total,
          paypal_id_order,
          paypal_id_transaction,
          id_code
        );

        // Validar si solo hay el id 2 en la compra (Energy Night)
        const isOnlyEnergyNight = id_items.length === 1 && id_items[0] === 2;
        
        let pdfAtch;
        if (isOnlyEnergyNight) {
          // Si solo hay el producto con id 2 (Energy Night), usar función específica
          pdfAtch = await generatePDFInvoice_energynight(
            paypal_id_transaction,
            body,            
          );
        } else {
          // Para cualquier otra combinación de productos, usar función general
          pdfAtch = await generatePDFInvoice(
            paypal_id_transaction,
            body,
            userResponse.user.uuid
          );
        }

        const mailResponse = await sendEmail(
          body,
          pdfAtch,
          paypal_id_transaction
        );

        return res.send({
          ...mailResponse,
          invoice: `${paypal_id_transaction}.pdf`,
        });
      }
    } else {
      return res.status(500).send({
        status: false,
        message:
          "Tu compra no pudo ser procesada, hay un problema con tu metodo de pago por favor intenta mas tarde...",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message:
        "hubo un error al procesar tu compra, por favor intenta mas tarde...",
    });
  }
});

app.post('/susbribe-email', async (req, res) => {
    const { body } = req;
    const userResponse = await RegisterModel.create_suscriber({...body}); 

    if(!userResponse.status){
        return  res.status(500).send({
            ...userResponse
        });
    }                    
    return res.send({
        ...userResponse,            
    });   

})

app.post('/free-register', async (req, res) => {
    const { body } = req;

    try {        
        const data = { 
            uuid: uuidv4(),            
            ...body
        };          
        const userResponse = await RegisterModel.create_user({ ...data }); 
        
        if(!userResponse.status){
            return  res.status(500).send({
                ...userResponse
            });
        }                 

        const pdfAtch = await generatePDF_freePass(body, data.uuid );

        const mailResponse = await sendEmail(data, pdfAtch, data.uuid);   

        return res.send({
            invoice:  `${data.uuid}.pdf`,
            ...mailResponse,
        });                
               
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu registro, por favor intenta mas tarde...'
        });
    }
});

app.post('/free-register-student-re-plus-mexico', async (req, res) => {
    const { body } = req;

    try {        
        const data = { 
            uuid: uuidv4(),            
            ...body
        };          
        const userResponse = await RegisterModel.create_user({ ...data }); 
        
        if(!userResponse.status){
            return  res.status(500).send({
                ...userResponse
            });
        }                 

        const pdfAtch = await generatePDF_freePass(body, data.uuid );

        const mailResponse = await sendEmailStudent(data, pdfAtch, data.uuid);   

        return res.send({
            invoice:  `${data.uuid}.pdf`,
            ...mailResponse,
        });                
               
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu registro, por favor intenta mas tarde...'
        });
    }
});

app.post('/free-register-sitio', async (req, res) => {
    const { body } = req;

    try {        
        const data = { 
            uuid: uuidv4(),            
            ...body
        };          
        const userResponse = await RegisterModel.create_user_sitio({ ...data }); 
        
        if(!userResponse.status){
            return  res.status(500).send({
                ...userResponse
            });
        }                 
                
        return res.send({
            uuid:  data.uuid,
            status: true,
            message: 'Tu registro fue exitoso...'
        });                
               
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu registro, por favor intenta mas tarde...'
        });
    }
});

app.post('/update-print-user', async (req, res) => {
    const { body } = req;
    const userResponse = await RegisterModel.update_print_user(body.uuid);

    if (userResponse) {
        return res.send({ success: true });
    } else {
        return res.send({ success: false });
    }
});

app.get('/search-user', async (req, res) => {
    const { uuid } = req.query;
    const user = await RegisterModel.search_user(uuid);
    if (user) {
        return res.status(200).send(user);
    } else {
        return res.status(404).send({ message: 'No se encontró el usuario' });
    }
});

app.get('/get-user-by-email', async (req, res) => {
    const { email } = req.query;
    const user = await RegisterModel.get_user_by_email(email);
    if (user) {
        return res.status(200).send(user);
    } else {
        return res.status(404).send({ message: 'No se encontró el usuario' });
    }
});

app.use(express.static('public'));

app.get('/generate-pdf', async (req, res) => {
  
  const doc = new PDFDocument();
  // Set the response type to PDF
  res.setHeader('Content-Type', 'application/pdf');

  // Pipe the PDF into the response
  doc.pipe(res);

  // Draw a dashed cross in the middle of the document
  const midX = doc.page.width / 2;
  const midY = doc.page.height / 2;

  doc.save();
  doc.lineWidth(2);
  doc.dash(5, { space: 5 });

  // Vertical dashed line
  doc.moveTo(midX, 0)
     .lineTo(midX, doc.page.height)
     .stroke();
  // Horizontal dashed line
  doc.moveTo(0, midY)
     .lineTo(doc.page.width, midY)
     .stroke();
  doc.restore();


  doc.image('img/header_ITM.png', 0, 0, { width: 305 })
  // aqui iria el QR con info del usuario
  const imageQr = await generateQRDataURL('uuid-1234567890');
  doc.image(imageQr, 90, 120, { width: 120 });
  
  doc
  .font('Helvetica-Bold')
  .fontSize(18)
  .text('Juan', 30, 240)
  .text('Perez')
  .fontSize(12)
  .font('Helvetica')
  .text('CEO/Founder')
  .moveDown(0.5)
  .text('IGECO');

  doc.image('img/footer_FUTURISTIC.jpg', 0, 328, { width: 305 });
  doc
    .font('Helvetica-Bold')
    .fontSize(17)
    .text('INSTRUCCIONES', 310, 10, {
        width: 300,
        align: 'center'
    })
    .text('PARA TU VISITA', 310, 30, {
        width: 300,
        align: 'center'
    })    
    .moveDown(0.2);

    doc.fontSize(14)
        .font('Helvetica')
        .text(' ESTEGAFETE DA ACCESO A:', {
        width: 300,
        align: 'center'
    }).moveDown(1);
    
    doc.font('Helvetica-Bold')
    .fontSize(12)
    .text('Futuristic Minds', 330)
    .fontSize(10)
    .font('Helvetica-BoldOblique')
    .list(['SEDE EXPLORA'])
    .font('Helvetica')
    .fontSize(8)
    .text('Programa educativo (conferencias, talleres y recorridos interactivos) especialmente para jóvenes, realizado en el Centro de Ciencias Explora, ubicado en Blvd. Francisco Villa 202, colonia La Martinica, León, Gto. México.', {
        width: 250,
        align: 'justify'
    })
    .moveDown(0.5);
    
    doc.font('Helvetica-BoldOblique')
    .fontSize(10)    
    .list(['SEDE VELARIA'])
    .font('Helvetica')
    .fontSize(8)
    .text('Área de las competencias de electromovilidad, robótica y habilidades profesionales, que se llevará a cabo en la Velaria de la Feria de León, ubicada en Blvd. Paseo de los Niños 111, Zona Recreativa y Cultural, León, Gto. México.', {
        width: 250,
        align: 'justify'
    })
    .moveDown(0.5);

    doc.font('Helvetica-Bold')
    .fontSize(12)
    .text('Industrial Transformation Mexico.')
    .fontSize(8)
    .font('Helvetica')
    .text('Los estudiantes podrán visitar el piso de exposición el viernes 11 de octubre a partir de las 3:00 p.m en Poliforum León.',  {
        width: 250,
        align: 'justify'
    })
    .moveDown(3);

    doc.lineWidth(1);    
    doc.moveTo(320, 250)
        .lineTo( 600, 250 )
        .stroke();

    doc.fontSize(8)
    .font('Helvetica')
    .text('El gafete es ', {
        width: 250,
        align: 'justify',
        continued: true
    })
    .font('Helvetica-Bold')
    .text('personal e intransferible ', {continued: true})
    .font('Helvetica')
    .text(' y deberás presentarlo de forma impresa o digital para permitir el ingreso.')
    .moveDown(2);

    doc
    .font('Helvetica-Bold')    
    .moveDown(1)
    .text('ITALIAN GERMAN EXHIBITION COMPANY MEXICO', {
        width: 250,    
        align: 'center'
    });

  doc.image('img/footer2_FUTURISTIC.jpg', 307, 328, { width: 306 });
  
  doc.save();
  // Rotate and draw some text
  doc.rotate(180, {origin: [150, 305]})
  .fillColor('#009FE3')  
  .fontSize(20)  
  .text('HORARIOS', 50, -110, {
    width: 200,
    align: 'center'
  
  })
  .moveDown(1)
  .fillColor('black')  
  .fontSize(14)
  .font('Helvetica-BoldOblique')
  .text('SEDE EXPLORA', {
    width: 200,
    align: 'center'  
  })
  .moveDown(1)
  .text('9 OCT ', {continued: true})
  .font('Helvetica')
  .text('10:00 - 17:00 hrs. ')
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('10 OCT ', {continued: true})
  .font('Helvetica')
  .text('10:00 - 17:00 hrs. ')
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('11 OCT ', {continued: true})
  .font('Helvetica')
  .text('10:00 - 15:00 hrs.')
  .fontSize(14)
  .moveDown(1)
  .font('Helvetica-BoldOblique')
  .text('SEDE VELARIA', {
    width: 200,
    align: 'center'  
  })
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('9 y 10 OCT ', {continued: true})
  .font('Helvetica')
  .text('9:00 - 17:00 hrs.')
  .moveDown(1)
  .font('Helvetica-Bold')
  .text('11 OCT ', {continued: true})
  .font('Helvetica')
  .text('9:00 - 16:00 hrs.')

  doc.fontSize(14)
  .font('Helvetica-Bold')
  .text('PLEGADO DE GAFETE', -360, -140, {
    width: 400,
    align: 'center'
  });

  doc.rotate(180, {origin: [-170, 50]})
  .image('img/indicaciones_ITM.jpg', -330, -100, { width: 305 });

  // Restore the previous state to avoid rotating everything else
  doc.restore();
  
  doc.end();
});

app.get('/template-email', async (req, res) => {
    const data = {
        name: 'Juan',
        paternSurname: 'Perez',
        maternSurname: 'Suarez',
        email: 'Pachi.claros@gmaail.com',
        phone: '4775690282',
        hour: '10:00 am',
        items: [
            {name: 'Combo Empresarial', quantity: 2},
            {name: 'item 2', quantity: 2},
        ]
    }
    const emailContent = await email_template({ ...data });
    res.send(emailContent);
});

/* EMAIL RE+ MEXICO */
async function sendEmail(data, pdfAtch = null, paypal_id_transaction = null){    
    try{     
                  
        const emailContent = data.currentLanguage === 'es' ?  await email_template({ ...data }) : await email_template_eng({ ...data });       
        await resend.emails.send({
            from: 'RE+ MEXICO 2026 <noreply@re-plus-mexico.com.mx>',
            to: data.email,
            subject: 'Confirmación de pre registro RE+ MEXICO 2026',
            html: emailContent,
            attachments: [
                {
                    filename: `${paypal_id_transaction}.pdf`,
                    path: `https://re-plus-mexico.com.mx/invoices/${paypal_id_transaction}.pdf`,
                    content_type: 'application/pdf'
                },
              ],           
        })        

        return {
            status: true,
            message: 'Gracias por registrarte, te hemos enviado un correo de confirmación a tu bandeja de entrada...'
        };

    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'No pudimos enviarte el correo de confirmación de tu registro, por favor descarga tu registro en este pagina y presentalo hasta el dia del evento...'
        };              
    }    
}

async function sendEmailStudent(data, pdfAtch = null, paypal_id_transaction = null){    
    try{     

        const emailContent = data.currentLanguage === 'es' ?  await email_template_student({ ...data }) : await email_template_eng_student({ ...data });       
        await resend.emails.send({
            from: 'RE+ MEXICO 2026 <noreply@re-plus-mexico.com.mx>',
            to: data.email,
            subject: 'Confirmación de pre registro RE+ MEXICO 2026',
            html: emailContent,
            attachments: [
                {
                    filename: `${paypal_id_transaction}.pdf`,
                    path: `https://re-plus-mexico.com.mx/invoices/${paypal_id_transaction}.pdf`,
                    content_type: 'application/pdf'
                },
              ],           
        })        

        return {
            status: true,
            message: 'Gracias por registrarte, te hemos enviado un correo de confirmación a tu bandeja de entrada...'
        };

    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: 'No pudimos enviarte el correo de confirmación de tu registro, por favor descarga tu registro en este pagina y presentalo hasta el dia del evento...'
        };              
    }    
}

function get_access_token() {
  const auth = `${client_id}:${client_secret}`;
  const data = "grant_type=client_credentials";
  return fetch(endpoint_url + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((json) => {
      return json.access_token;
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})