import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Helper function to generate QR code as a data URL
async function generateQRDataURL(text) {
    try {
        return await QRCode.toDataURL(text);
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error; // Rethrow to handle it in the calling context
    }
}

function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
}

function getSpanishDateString(date) {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} de ${months[monthIndex]} de ${year}`;
}

// Function to generate PDF invoice
async function generatePDFInvoice(paypal_id_transaction, body, uuid) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const outputPath = path.resolve(__dirname, '../invoices');
    const pdfSave = path.join(outputPath, `${paypal_id_transaction}.pdf`);

    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfSave);            
    const logoVev = path.resolve(__dirname, 'img/Logo_ITM.jpg');     
      
    doc.pipe(pdfStream);             
    doc.image(logoVev, 50, 45, { width: 100 });    
    doc
        .fillColor("#444444")
        .fontSize(20)
        .fontSize(10)
        .text("ITALIAN GERMAN EXHIBITION COMPANY ME.", 200, 50, { align: "right" })
        .text("Blvrd Francisco Villa 102-piso 14, Oriental, 37510 ", 200, 65, { align: "right" })
        .text("León de los Aldama, Gto.", 200, 80, { align: "right" })
        .moveDown();
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Recibo de Compra", 50, 160);
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 185)
        .lineTo(550, 185)
        .stroke();

    doc
        .fontSize(10)
        .text("N° transacción:", 50, 200)
        .font("Helvetica-Bold")
        .text(paypal_id_transaction, 150, 200)
        .font("Helvetica")
        .text("Fecha:", 50, 200 + 15)
        .text(getSpanishDateString(new Date()), 150, 200 + 15)
        .text("Total:", 50, 200 + 30)
        .text(formatAmountMXN(body.total),150,200 + 30)
        .font("Helvetica-Bold")
        .text(body.name, 300, 200)
        .font("Helvetica")
        .text(body.email, 300, 200 + 15)
        .text(body.phone, 300, 200 + 30 )
        .moveDown();
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 252)
        .lineTo(550, 252)
        .stroke();
        
    doc
        .fontSize(10)
        .text('Descripcion', 50, 280)
        .text('Costo unitario', 290, 280, { width: 90, align: "right" })
        .text('cantidad', 370, 280, { width: 90, align: "right" })
        .text('Total', 0, 280, { align: "right" });
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, 300)
        .lineTo(550, 300)
        .stroke();
        
    doc    
    .fontSize(10)
    .text(body.item.name, 50, 310)
    .text(formatAmountMXN('5000'), 330, 310 )
    .text('1', 450, 310)
    .text(formatAmountMXN('5000'), 0, 310, { align: "right" });
    
    doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, 330)
    .lineTo(550, 330)
    .stroke();
    
    doc.moveDown(2);    
    doc
        .fontSize(10)
        .text('Subtotal:       $5,000', { width: 540, align: "right" });
    doc
        .fontSize(10)
        .text('IVA:            $8,00 ', { width: 540, align: "right" });   

    doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text('TOTAL:          $5,800' , { width: 540, align: "right" });    
    
    doc.moveDown(5)
        .font("Helvetica-Bold")        
        .text("SI DESEAS FACTURA FAVOR DE ENVIAR CORREO A emmanuel.heredia@igeco.mx", 50)
        .font("Helvetica")
        .text("FAVOR DE ADJUNTAR LOS SIGUIENTES DOCUMENTOS:")
        .text("- CONSTANCIA SITUACIÓN FISCAL", 55)
        .text("- FOTO DEL RECIBO DE COMPRA", 55)
        .text("- INDICAR EL MÉTODO DE PAGO (TARJETA DE CREDITO O DEBITO)", 55)
        .text("- USO DE CFDI", 55)
        .text("* FECHA MÁXIMA DE FACTURACIÓN 25 DE OCTUBRE DE 2024")

    const qrMainUser = await generateQRDataURL(uuid);
    doc.addPage();
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
 
 
     doc.image('img/bannerGafete.jpg', 0, 0, { width: 305 });
     // aqui iria el QR con info del usuario    
     doc.image(qrMainUser, 90, 120, { width: 120 });
     
     doc
     .font('Helvetica-Bold')
     .fontSize(18)
     .text(body.name, 30, 240)
     .text(body.paternSurname,)
     .fontSize(12)
     .font('Helvetica')
     .text(body.position)
     .moveDown(0.5)
     .text(body.company);
 
     doc.image('img/footer_programa_vip.jpg', 0, 328, { width: 305 });
     doc
     .font('Helvetica-Bold')
     .fontSize(17)
     .text('INSTRUCCIONES PARA TU VISITA', 310, 10, {
         width: 300,
         align: 'center'
     })
     .moveDown(0.2);
 
     doc.text(' GUIDELINES FOR YOUR VISIT', {
         width: 300,
         align: 'center'
     }).moveDown(1);
     
     doc.font('Helvetica-Bold')
     .fontSize(8)
     .text('1.', 330)
     .font('Helvetica')
     .text('Tu gafete es tu pase a la exposición de ITM 2024. Deberás portarlo en todo momento.', 345, 75, {
         width: 250,
         align: 'justify'
     })  
     doc.text('Your badge is your access pass to ITM 2024 tradeshow. You must wear it at all times.',{
         width: 250,
         align: 'justify'
     })
     .moveDown(1); 
 
     doc.font('Helvetica-Bold')
     .fontSize(8)
     .text('2.', 330)
     .font('Helvetica')
     .text('El gafete es personal e intransferible. Por motivos de seguridad, podemos solicitarte al ingreso de la exposición una identificación con fotografía.', 345, 120, {
         width: 250,
         align: 'justify'
     })
     .text('The badge is personal and non-transferable. For security reasons, we may ask for an ID with picture at the entrance of the exhibition.', {
         width: 250,
         align: 'justify'
     })
     .moveDown(1); 
     doc.font('Helvetica-Bold')
     .fontSize(8)
     .text('3.', 330)
     .font('Helvetica')
     .text('Disfruta tu visita y utiliza el hashtag', 345, 175, {
         width: 250,    
         continued: true
     })
     .fillColor('#1E92D0')
     .font('Helvetica-Bold')
     .text(' #ITM2024 ', { continued: true })
     .fillColor('black')
     .font('Helvetica')
     .text(' en tus posteos en redes sociales.')
     .text('Enjoy your visit and use the hashtag', {
         width: 250,    
         continued: true
     })
     .fillColor('#1E92D0')
     .font('Helvetica-Bold')
     .text(' #ITM2024 ', { continued: true })
     .fillColor('black')
     .font('Helvetica')
     .text(' on your social media posts.')
     .moveDown(2);
     
     doc
     .font('Helvetica-Bold')
     .text('HORARIOS / SCHEDULE',{
         width: 250,    
         align: 'center'
     })
     .moveDown(1)
     .text('Octubre')
     .text('October')
     .text('(9)   11:00 am – 19:00 hrs', 330, 250, {
         width: 250,    
         align: 'center'
     })
     .text('(10)  11:00 am – 19:00 hrs', 330, 260, {
         width: 250,    
         align: 'center'
     })
     .text('(11)  11:00 am – 17:00 hrs', 330, 270, {
         width: 250,    
         align: 'center'
     })
     .moveDown(1)
     .text('ITALIAN GERMAN EXHIBITION COMPANY MEXICO', {
         width: 250,    
         align: 'center'
     });
 
     doc.image('img/footer2_programa_vip-new.jpg', 307, 328, { width: 306 });;
     
     doc.save();
     // Rotate and draw some text
     doc.rotate(180, {origin: [150, 305]})
     .fillColor('red')  
     .fontSize(20)
     .text('AVISO / DISCLAIMER', 15, -140, {
         width: 250,
         align: 'center'
     
     })
     .moveDown(1)
     .fillColor('black')  
     .fontSize(12)
     .text('Agilice su entrada imprimiendo su acreditación o llevando este documento en su teléfono móvil. Speed up your entrance by printing your badge or carrying this document on your cell phone.', {
         width: 250,
         align: 'justify'
     
     })
     .moveDown(1)
     .text('El gafete es personal e intransferible y se imprimirá una sola vez en el módulo de registro digital. The badge is personal and non-transferable and will be printed once at the digital registration module.', {
         width: 250,
         align: 'justify'
     
     })
     .moveDown(1)
     .text('En caso de que pierdas tu gafete y necesites reimprimirlo, se cobrará una cuota de $300 MXN. In case you lose your badge and need to reprint it, a replacement fee of $300 MXN will be charged.', {
         width: 250,
         align: 'justify'
     
     });
 
     doc.fontSize(14)
     .text('BADGE FOLDING / PLEGADO DE GAFETE', -360, -140, {
         width: 400,
         align: 'center'
     });
 
     doc.rotate(180, {origin: [-170, 50]})
     .image('img/indicaciones_ITM.jpg', -330, -100, { width: 305 });
 
     // Restore the previous state to avoid rotating everything else
     doc.restore();       

    doc.end();
    return pdfSave;
}

async function generatePDF_freePass( body, uuid) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const outputPath = path.resolve(__dirname, '../invoices');
    const pdfSave = path.join(outputPath, `${uuid}.pdf`);

    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfSave);            
    //const logoVev = path.resolve(__dirname, 'Logo_ITM.jpg');  
    
    const qrMainUser = await generateQRDataURL(uuid);

    doc.pipe(pdfStream);    
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

    
    body.typeRegister === 'VISITANTE' ? doc.image('img/header_ITM.png', 0, 0, { width: 305 }) : doc.image('img/bannerGafete.jpg', 0, 0, { width: 305 });       
    // aqui iria el QR con info del usuario    
    doc.image(qrMainUser, 90, 120, { width: 120 });
    
    doc
    .font('Helvetica-Bold')
    .fontSize(18)
    .text(body.name, 30, 240)
    .text(body.paternSurname,)
    .fontSize(12)
    .font('Helvetica')
    .text(body.position)
    .moveDown(0.5)
    .text(body.company);

    body.typeRegister === 'VISITANTE' ? doc.image('img/footer_ITM.jpg', 0, 328, { width: 305 }) : doc.image('img/footer_medio.jpg', 0, 328, { width: 305 });
    doc
    .font('Helvetica-Bold')
    .fontSize(17)
    .text('INSTRUCCIONES PARA TU VISITA', 310, 10, {
        width: 300,
        align: 'center'
    })
    .moveDown(0.2);

    doc.text(' GUIDELINES FOR YOUR VISIT', {
        width: 300,
        align: 'center'
    }).moveDown(1);
    
    doc.font('Helvetica-Bold')
    .fontSize(8)
    .text('1.', 330)
    .font('Helvetica')
    .text('Tu gafete es tu pase a la exposición de ITM 2024. Deberás portarlo en todo momento.', 345, 75, {
        width: 250,
        align: 'justify'
    })  
    doc.text('Your badge is your access pass to ITM 2024 tradeshow. You must wear it at all times.',{
        width: 250,
        align: 'justify'
    })
    .moveDown(1); 

    doc.font('Helvetica-Bold')
    .fontSize(8)
    .text('2.', 330)
    .font('Helvetica')
    .text('El gafete es personal e intransferible. Por motivos de seguridad, podemos solicitarte al ingreso de la exposición una identificación con fotografía.', 345, 120, {
        width: 250,
        align: 'justify'
    })
    .text('The badge is personal and non-transferable. For security reasons, we may ask for an ID with picture at the entrance of the exhibition.', {
        width: 250,
        align: 'justify'
    })
    .moveDown(1); 
    doc.font('Helvetica-Bold')
    .fontSize(8)
    .text('3.', 330)
    .font('Helvetica')
    .text('Disfruta tu visita y utiliza el hashtag', 345, 175, {
        width: 250,    
        continued: true
    })
    .fillColor('#1E92D0')
    .font('Helvetica-Bold')
    .text(' #ITM2024 ', { continued: true })
    .fillColor('black')
    .font('Helvetica')
    .text(' en tus posteos en redes sociales.')
    .text('Enjoy your visit and use the hashtag', {
        width: 250,    
        continued: true
    })
    .fillColor('#1E92D0')
    .font('Helvetica-Bold')
    .text(' #ITM2024 ', { continued: true })
    .fillColor('black')
    .font('Helvetica')
    .text(' on your social media posts.')
    .moveDown(2);
    
    doc
    .font('Helvetica-Bold')
    .text('HORARIOS / SCHEDULE',{
        width: 250,    
        align: 'center'
    })
    .moveDown(1)
    .text('Octubre')
    .text('October')
    .text('(9)   11:00 am – 19:00 hrs', 330, 250, {
        width: 250,    
        align: 'center'
    })
    .text('(10)  11:00 am – 19:00 hrs', 330, 260, {
        width: 250,    
        align: 'center'
    })
    .text('(11)  11:00 am – 17:00 hrs', 330, 270, {
        width: 250,    
        align: 'center'
    })
    .moveDown(1)
    .text('ITALIAN GERMAN EXHIBITION COMPANY MEXICO', {
        width: 250,    
        align: 'center'
    });

    body.typeRegister === 'VISITANTE' ? doc.image('img/footer-itm-2-new.jpg', 307, 328, { width: 306 }) : doc.image('img/footer-itm-2_medio-new.jpg', 307, 328, { width: 306 });;
    
    doc.save();
    // Rotate and draw some text
    doc.rotate(180, {origin: [150, 305]})
    .fillColor('red')  
    .fontSize(20)
    .text('AVISO / DISCLAIMER', 15, -140, {
        width: 250,
        align: 'center'
    
    })
    .moveDown(1)
    .fillColor('black')  
    .fontSize(12)
    .text('Agilice su entrada imprimiendo su acreditación o llevando este documento en su teléfono móvil. Speed up your entrance by printing your badge or carrying this document on your cell phone.', {
        width: 250,
        align: 'justify'
    
    })
    .moveDown(1)
    .text('El gafete es personal e intransferible y se imprimirá una sola vez en el módulo de registro digital. The badge is personal and non-transferable and will be printed once at the digital registration module.', {
        width: 250,
        align: 'justify'
    
    })
    .moveDown(1)
    .text('En caso de que pierdas tu gafete y necesites reimprimirlo, se cobrará una cuota de $300 MXN. In case you lose your badge and need to reprint it, a replacement fee of $300 MXN will be charged.', {
        width: 250,
        align: 'justify'
    
    });

    doc.fontSize(14)
    .text('BADGE FOLDING / PLEGADO DE GAFETE', -360, -140, {
        width: 400,
        align: 'center'
    });

    doc.rotate(180, {origin: [-170, 50]})
    .image('img/indicaciones_ITM.jpg', -330, -100, { width: 305 });

    // Restore the previous state to avoid rotating everything else
    doc.restore();       

    doc.end();
    return pdfSave;
}

//generate pdf for ecomondo pass
async function generatePDF_freePass_ecomondo( body, uuid) {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const outputPath = path.resolve(__dirname, '../invoices');
    const pdfSave = path.join(outputPath, `${uuid}.pdf`);

    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfSave);            
    //const logoVev = path.resolve(__dirname, 'Logo_ITM.jpg');  
    
    const qrMainUser = await generateQRDataURL(uuid);

    doc.pipe(pdfStream);    
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
    
   
    body.typeRegister === 'VISITANTE' ?  doc.image('img/header-amof.jpg', 0, 0, { width: 305 }) : doc.image('img/bannerGafete.jpg', 0, 0, { width: 305 });
    // aqui iria el QR con info del usuario    
    doc.image(qrMainUser, 90, 120, { width: 120 });
    
    doc
    .font('Helvetica-Bold')
    .fontSize(18)
    .text(body.name, 30, 240)
    .text(body.paternSurname,)
    .fontSize(12)
    .font('Helvetica')
    .text(body.position)
    .moveDown(0.5)
    .text(body.company);

    body.typeRegister === 'VISITANTE' ? doc.image('img/footer_ITM.jpg', 0, 328, { width: 305 }) : doc.image('img/footer_medio.jpg', 0, 328, { width: 305 });
    doc
    .font('Helvetica-Bold')
    .fontSize(17)
    .text('INSTRUCCIONES PARA TU VISITA', 310, 10, {
        width: 300,
        align: 'center'
    })
    .moveDown(0.2);

    doc.text(' GUIDELINES FOR YOUR VISIT', {
        width: 300,
        align: 'center'
    }).moveDown(1);
    
    doc.font('Helvetica-Bold')
    .fontSize(8)
    .text('1.', 330)
    .font('Helvetica')
    .text('Tu gafete es tu pase a la exposición de AMOF 2024. Deberás portarlo en todo momento.', 345, 75, {
        width: 250,
        align: 'justify'
    })  
    doc.text('Your badge is your access pass to AMOF 2024 tradeshow. You must wear it at all times.',{
        width: 250,
        align: 'justify'
    })
    .moveDown(1); 

    doc.font('Helvetica-Bold')
    .fontSize(8)
    .text('2.', 330)
    .font('Helvetica')
    .text('El gafete es personal e intransferible. Por motivos de seguridad, podemos solicitarte al ingreso de la exposición una identificación con fotografía.', 345, 120, {
        width: 250,
        align: 'justify'
    })
    .text('The badge is personal and non-transferable. For security reasons, we may ask for an ID with picture at the entrance of the exhibition.', {
        width: 250,
        align: 'justify'
    })
    .moveDown(1); 
    doc.font('Helvetica-Bold')
    .fontSize(8)
    .text('3.', 330)
    .font('Helvetica')
    .text('Disfruta tu visita y utiliza el hashtag', 345, 175, {
        width: 250,    
        continued: true
    })
    .fillColor('#1E92D0')
    .font('Helvetica-Bold')
    .text(' #AMOF2024 ', { continued: true })
    .fillColor('black')
    .font('Helvetica')
    .text(' en tus posteos en redes sociales.')
    .text('Enjoy your visit and use the hashtag', {
        width: 250,    
        continued: true
    })
    .fillColor('#1E92D0')
    .font('Helvetica-Bold')
    .text(' #AMOF2024 ', { continued: true })
    .fillColor('black')
    .font('Helvetica')
    .text(' on your social media posts.')
    .moveDown(2);
    
    doc
    .font('Helvetica-Bold')
    .text('HORARIOS / SCHEDULE',{
        width: 250,    
        align: 'center'
    })
    .moveDown(1)
    .text('Octubre')
    .text('October')
    .text('(9)   11:00 am – 19:00 hrs', 330, 250, {
        width: 250,    
        align: 'center'
    })
    .text('(10)  11:00 am – 19:00 hrs', 330, 260, {
        width: 250,    
        align: 'center'
    })
    .text('(11)  11:00 am – 17:00 hrs', 330, 270, {
        width: 250,    
        align: 'center'
    })
    .moveDown(1)
    .text('ITALIAN GERMAN EXHIBITION COMPANY MEXICO', {
        width: 250,    
        align: 'center'
    });

    body.typeRegister === 'VISITANTE' ? doc.image('img/footer-itm-2-new.jpg', 307, 328, { width: 306 }) : doc.image('img/footer-itm-2_medio-new.jpg', 307, 328, { width: 306 });;
    
    doc.save();
    // Rotate and draw some text
    doc.rotate(180, {origin: [150, 305]})
    .fillColor('red')  
    .fontSize(20)
    .text('AVISO / DISCLAIMER', 15, -140, {
        width: 250,
        align: 'center'
    
    })
    .moveDown(1)
    .fillColor('black')  
    .fontSize(12)
    .text('Agilice su entrada imprimiendo su acreditación o llevando este documento en su teléfono móvil. Speed up your entrance by printing your badge or carrying this document on your cell phone.', {
        width: 250,
        align: 'justify'
    
    })
    .moveDown(1)
    .text('El gafete es personal e intransferible y se imprimirá una sola vez en el módulo de registro digital. The badge is personal and non-transferable and will be printed once at the digital registration module.', {
        width: 250,
        align: 'justify'
    
    })
    .moveDown(1)
    .text('En caso de que pierdas tu gafete y necesites reimprimirlo, se cobrará una cuota de $300 MXN. In case you lose your badge and need to reprint it, a replacement fee of $300 MXN will be charged.', {
        width: 250,
        align: 'justify'
    
    });

    doc.fontSize(14)
    .text('BADGE FOLDING / PLEGADO DE GAFETE', -360, -140, {
        width: 400,
        align: 'center'
    });

    doc.rotate(180, {origin: [-170, 50]})
    .image('img/indicaciones_ITM.jpg', -330, -100, { width: 305 });

    // Restore the previous state to avoid rotating everything else
    doc.restore();       

    doc.end();
    return pdfSave;
}


export { generatePDFInvoice, generatePDF_freePass, generatePDF_freePass_ecomondo, generateQRDataURL };
