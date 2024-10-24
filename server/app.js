import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import {RegisterModel} from './db.js';
import {email_template} from './TemplateEmail.js';
import {email_template_eng} from './TemplateEmailEng.js';
import {email_template_futuristic} from './TemplateFuturistic.js';
import {email_template_amof} from './TemplateEmailAmof.js';
import {email_template_amof_eng} from './TemplateEmailAmofEng.js';
import {email_template_oktoberfest} from './TemplateOktoberfest.js';
import {email_template_oktoberfest_en} from './TemplateOktoberfestEn.js';

import { generatePDFInvoice, generatePDF_freePass_ecomondo, generateQRDataURL, } from './generatePdf.js';
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
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
const resend = new Resend(process.env.RESEND_APIKEY)

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

app.post('/create-order', (req, res) => {    
    const { body } = req;
    
    if(body.total != 5800){
        return res.status(500).send({
            status: false,
            message: 'Tu compra no pudo ser procesada, la información no es valida...'
        });
    }

    get_access_token()
        .then(access_token => {
            let order_data_json = {
                'intent': "CAPTURE",
                'purchase_units': [{
                    'amount': {
                        'currency_code': 'MXN',
                        'value': body.total                        
                    },                                             
                    'description': 'PROGRAMA DE CONFERENCIAS CCE - CONCAMIN - ITM - AMOF 2024',
                }]
            };
            const data = JSON.stringify(order_data_json)

            fetch(endpoint_url + '/v2/checkout/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: data
                })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    res.send(json);
                }) //Send minimal data to client
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
});

app.post('/complete-order', async (req, res) => {
    const { body } = req;    
    try {
        const uuid = uuidv4();                
        const userResponse = await RegisterModel.create_user({ uuid, ...body });
        const { insertId } = userResponse;

        if(!userResponse.status){
            return  res.status(500).send({
                ...userResponse
            });
        }

        const access_token = await get_access_token();
        const response = await fetch(endpoint_url + '/v2/checkout/orders/' + req.body.orderID + '/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        const json = await response.json();
        console.log(JSON.stringify(json));
        if (json.id) {
            if(json.purchase_units[0].payments.captures[0].status === 'COMPLETED' || json.purchase_units[0].payments.captures[0].status === 'PENDING' ){
                
                const paypal_id_order = json.id;
                const paypal_id_transaction = json.purchase_units[0].payments.captures[0].id;                     
                await RegisterModel.save_order(insertId, paypal_id_order, paypal_id_transaction, body.total);

                const pdfAtch = await generatePDFInvoice(paypal_id_transaction, body, uuid);

                const mailResponse = await sendEmail(body, pdfAtch, paypal_id_transaction);   
        
                return res.send({
                    ...mailResponse,
                    invoice: `${paypal_id_transaction}.pdf`
                });                
            }
        } else {        
            return res.status(500).send({
                status: false,
                message: 'Tu compra no pudo ser procesada, hay un problema con tu metodo de pago por favor intenta mas tarde...'
            });
        }       
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu compra, por favor intenta mas tarde...'
        });
    }
});

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

        //const pdfAtch = await generatePDF_freePass(body, data.uuid );

        //const mailResponse = await sendEmail(data, pdfAtch, data.uuid);   

        return res.send({
            ...userResponse,            
        });                
               
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu registro, por favor intenta mas tarde...'
        });
    }
});

// verificar codigo de cortesia  si es correcto crear gafete vip
app.post('/check-cortesia', async (req, res) => {
    const { body } = req;
    const response = await RegisterModel.check_code_cortesia(body.code_cortesia);    
    if (response.status) {
        const userResponse = await RegisterModel.get_user_by_email(body.email);
        if (!userResponse.status) {
            return res.status(404).send({
                message: userResponse.error
            });
        }
        try {
            const data = { 
                total: 0,
                item: body.item,
                ...userResponse.user
            };

            await RegisterModel.save_order(data.id, body.code_cortesia, 'codigo-cortesia', data.total);
            await RegisterModel.use_code_cortesia(body.code_cortesia);
            const pdfAtch = await generatePDFInvoice(body.code_cortesia+'-cortesia', data, data.uuid);
            const mailResponse = await sendEmail(data, pdfAtch, body.code_cortesia+'-cortesia');   
    
            return res.send({
                ...mailResponse,
                invoice: `${body.code_cortesia+'-cortesia'}.pdf`
            });
        } catch (err) {
            return res.status(500).send({
                status: false,
                message: 'hubo un error al procesar tu compra, por favor intenta mas tarde...'
            });
        }
    } else {
        res.status(400 ).send({
            message: response.message
        });
    }
});

app.get('/get-postalcode/:cp', async (req, res) => {
    const { cp } = req.params;
    const response = await RegisterModel.get_postal_code({cp});
    if(response.status){
        return res.send({
            status: true,
            records: response.result
        })
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron resultados...'
        });
    }    
})

app.get('/get-user-by-email', async (req, res) => {
    const { email, requireNonVip = 'true' } = req.query;
    const response = await RegisterModel.get_user_by_email(email, JSON.parse(requireNonVip));
    if (response.error) {
        res.status(404).send({
            message: response.error
        });
    } else {
        res.send(response.user);
    }
});

app.post('/upgrade-user', async (req, res) => {
    const { body } = req;
    const userResponse = await RegisterModel.get_user_by_email(body.email);
    if (!userResponse.status) {
        return res.status(404).send({
            message: userResponse.error
        });
    }
    try {
        const data = { 
            total: body.total,
            item: body.item,
            ...userResponse.user
        };
        
        const access_token = await get_access_token();
        const response = await fetch(endpoint_url + '/v2/checkout/orders/' + body.orderID + '/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        const json = await response.json();
        if (json.id) {
            if(json.purchase_units[0].payments.captures[0].status === 'COMPLETED' || json.purchase_units[0].payments.captures[0].status === 'PENDING' ){
                
                const paypal_id_order = json.id;
                const paypal_id_transaction = json.purchase_units[0].payments.captures[0].id;                     
                await RegisterModel.save_order(data.id, paypal_id_order, paypal_id_transaction, body.total);

                const pdfAtch = await generatePDFInvoice(paypal_id_transaction, data, data.uuid);

                const mailResponse = await sendEmail(data, pdfAtch, paypal_id_transaction);   
        
                return res.send({
                    ...mailResponse,
                    invoice: `${paypal_id_transaction}.pdf`
                });                
            }
        } else {        
            return res.status(500).send({
                status: false,
                message: 'Tu compra no pudo ser procesada, hay un problema con tu metodo de pago por favor intenta mas tarde...'
            });
        }       
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu compra, por favor intenta mas tarde...'
        });
    }
});

// Create student register
app.post('/free-register-futuristic', async (req, res) => {
    const { body } = req;
    
    try {        
        const data = { 
            uuid: uuidv4(),            
            ...body
        };          
        const userResponse = await RegisterModel.create_user_futuristic({ ...data }); 

        if(!userResponse.status){
            return  res.status(500).send({
                ...userResponse
            });
        }
                

        const pdfAtch = await generatePDF_freePass_futuristic(body, data.uuid);

        const mailResponse = await sendEmailFuturistic(data, pdfAtch, data.uuid);   

        return res.send({
            ...mailResponse,
            invoice: `${data.uuid}.pdf`
        });                
               
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu registro, por favor intenta mas tarde...'
        });
    }
});

// Create amof registration
app.post('/free-register-amof', async (req, res) => {
    const { body } = req;

    try {        
        const data = { 
            uuid: uuidv4(),            
            ...body
        };          
        const userResponse = await RegisterModel.create_user_amof({ ...data }); 

        if(!userResponse.status){
            return  res.status(500).send({
                ...userResponse
            });
        }
                 
        const pdfAtch = await generatePDF_freePass_amof(body, data.uuid);

        const mailResponse = await sendEmailAmof(data, pdfAtch, data.uuid);   

        return res.send({
            ...mailResponse,
            invoice: `${data.uuid}.pdf`
        });                
               
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu registro, por favor intenta mas tarde...'
        });
    }
});

// oktoberfest registration
app.post('/create-order-oktoberfest', async (req, res) => {
    const { body } = req;
    let total = 0;

    const check_availability = await RegisterModel.check_sales_limit(body.hour);    
    if(!check_availability.status){
        return res.status(500).send({
            status: false,
            message: 'Lo sentimos, el dia y horario seleccionado ya no esta disponible, por favor selecciona otro...'
        });
    }

    const get_products = await RegisterModel.get_products();    
    if(get_products.status){
        const products = get_products.result;

        body.items.forEach(item => {
            const product = products.find(product => product.id == item.id);
            total += product.price * item.quantity;

            if(!product){
                return res.status(500).send({
                    status: false,
                    message: 'Producto no encontrado...'
                });
            }            
        });
        if(total != body.total){
            return res.status(500).send({
                status: false,
                message: 'Tu compra no pudo ser procesada, la información no es valida...'
            });
        }
        get_access_token()
        .then(access_token => {
            let order_data_json = {
                'intent': "CAPTURE",
                'purchase_units': [{
                    'amount': {
                        'currency_code': 'MXN',
                        'value': body.total                        
                    },                                             
                    'description': 'Venta de Programa VIP Oktoberfest 2024 online',
                }]
            };
            const data = JSON.stringify(order_data_json)

            fetch(endpoint_url + '/v2/checkout/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: data
                })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    res.send(json);
                }) //Send minimal data to client
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })     
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron productos...'
        });
    }        
});

// oktoberfest complete order
app.post('/complete-order-oktoberfest', async (req, res) => {
    const { body } = req;    
    try {
        
        const access_token = await get_access_token();
        const response = await fetch(endpoint_url + '/v2/checkout/orders/' + req.body.orderID + '/capture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        const json = await response.json();
        console.log(JSON.stringify(json));
        if (json.id) {
            if(json.purchase_units[0].payments.captures[0].status === 'COMPLETED' || json.purchase_units[0].payments.captures[0].status === 'PENDING' ){
                
                const paypal_id_order = json.id;
                const paypal_id_transaction = json.purchase_units[0].payments.captures[0].id;                     
                await RegisterModel.save_order_oktoberfest({paypal_id_order, paypal_id_transaction, ...body});

                const pdfAtch = await generatePDFInvoiceOktoberfest(paypal_id_transaction, body);

                const mailResponse = await sendEmailOktoberfest(body, pdfAtch, paypal_id_transaction);   
                
                return res.send({
                    ...mailResponse,
                    invoice: `${paypal_id_transaction}.pdf`
                });                
            }
        } else {        
            return res.status(500).send({
                status: false,
                message: 'Tu compra no pudo ser procesada, hay un problema con tu metodo de pago por favor intenta mas tarde...'
            });
        }       
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: false,
            message: 'hubo un error al procesar tu compra, por favor intenta mas tarde...'
        });
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
        name: 'Juan Perez',
        email: 'Pachi.claros@gmaail.com',
        phone: '4775690282',
        hour: '10:00 am',
        items: [
            {name: 'Combo Empresarial', quantity: 2},
            {name: 'item 2', quantity: 2},
        ]
    }
    const emailContent = await email_template_oktoberfest({ ...data });
    res.send(emailContent);
});

// endpoints para registro en sitio
app.get('/get-info-user/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const response = await RegisterModel.get_info_user(uuid);
    if(response.status){
        return res.send({
            status: true,
            records: response.result
        })
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron resultados...'
        });
    }    
});

app.get('/get-check-cobrar/:id', async (req, res) => {
    const { id } = req.params;
    const response = await RegisterModel.get_info_user_to_pay(id);
    if(response.status){
        return res.send({
            status: true,
            records: response.result
        })
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron resultados...'
        });
    }    
});

app.put('/marcar-pago', async (req, res) => { 
    const {id, cobrar} = req.body
    const response = await RegisterModel.pagar_gafete(id, cobrar);
    if(response.status){
        return res.send({
            status: true,
            records: response.result
        })
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron resultados...'
        });
    }    
});

app.get('/get-check-user-vip/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const response = await RegisterModel.get_info_user_vip(uuid);
    if(response.status){
        return res.send({
            status: true,
            records: response.result
        })
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron resultados...'
        });
    }    
});

app.post('/marcar-pago-vip', async (req, res) => { 
    const {id} = req.body
    const response = await RegisterModel.pagar_gafete_vip(id);
    if(response.status){
        return res.send({
            status: true,
            records: response
        })
    }else{
        return res.status(500).send({
            status: false,
            message: 'No se encontraron resultados...'
        });
    }    
});


/* EMAIL AMOF */
async function sendEmailAmof(data, pdfAtch = null, paypal_id_transaction = null){    
    try{

        const emailContent = data.currentLanguage === 'es' ?  await email_template_amof({ ...data }) : await email_template_amof_eng({ ...data });

        await resend.emails.send({
            from: 'AMOF 2024 <noreply@industrialtransformation.mx>',
            to: data.email,
            subject: 'Confirmación de pre registro AMERICAS´ mobility of the future 2024',
            html: emailContent,
            attachments: [
                {
                    filename: `${paypal_id_transaction}.pdf`,
                    path: `https://industrialtransformation.mx/invoices/${paypal_id_transaction}.pdf`,
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


/* EMAIL ITM */
async function sendEmail(data, pdfAtch = null, paypal_id_transaction = null){    
    try{
       
        
        const emailContent = data.currentLanguage === 'es' ?  await email_template({ ...data }) : await email_template_eng({ ...data });
       
        await resend.emails.send({
            from: 'ITM 2024 <noreply@industrialtransformation.mx>',
            to: data.email,
            subject: 'Confirmación de pre registro ITM 2024',
            html: emailContent,
            attachments: [
                {
                    filename: `${paypal_id_transaction}.pdf`,
                    path: `https://industrialtransformation.mx/invoices/${paypal_id_transaction}.pdf`,
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
    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'
    return fetch(endpoint_url + '/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
        })
        .then(res => res.json())
        .then(json => {
            return json.access_token;
        })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})