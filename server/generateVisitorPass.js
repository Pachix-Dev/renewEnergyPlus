import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const artworkDirectory = path.join(serverDirectory, 'img', 'visitor2027');

// Astro publishes public/fonts as fonts next to the deployed server directory.
const sourceFonts = path.resolve(serverDirectory, '../public/fonts/Montserrat');
const fontDirectory = fs.existsSync(sourceFonts)
    ? sourceFonts
    : path.resolve(serverDirectory, '../fonts/Montserrat');
const eventWebsite = 'https://re-plus-mexico.com.mx/';
const premiumWebsite = new URL('programa-premium/', eventWebsite).href;

const normalizeText = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

function drawText(doc, text, x, y, width, options = {}) {
    const { font = 'regular', size = 11, color = '#080808', ...textOptions } = options;
    doc.font(font).fontSize(size).fillColor(color)
        .text(text, x, y, { width, lineGap: 0, ...textOptions });
}

function drawHeading(doc, spanish, english, y) {
    const parts = [
        { text: spanish, font: 'extraBold', size: 18, color: '#4840DE' },
        { text: ' / ', font: 'regular', size: 17, color: '#080808' },
        { text: english, font: 'semiBold', size: 15, color: '#080808' },
    ];
    const totalWidth = parts.reduce((width, part) => {
        return width + doc.font(part.font).fontSize(part.size).widthOfString(part.text);
    }, 0);
    const scale = Math.min(1, 520 / totalWidth);
    let x = 46;

    for (const part of parts) {
        const size = part.size * scale;
        drawText(doc, part.text, x, y + (18 * scale - size), 520, {
            font: part.font, color: part.color, size, lineBreak: false,
        });
        x += doc.widthOfString(part.text);
    }
}

function fitVisitorField(doc, text, font, maxHeight) {
    let size = 12.8;
    doc.font(font).fontSize(size);
    while (size > 8 && doc.heightOfString(text, { width: 342 }) > maxHeight) {
        size = Math.max(8, size - 0.5);
        doc.fontSize(size);
    }
    return {
        text, font, size, maxHeight,
        height: Math.min(maxHeight, doc.heightOfString(text, { width: 342 })),
    };
}

function drawVisitorCard(doc, body, qrCode) {
    const background = doc.linearGradient(46, 299, 566, 299)
        .stop(0, '#D4CDFF').stop(1, '#D8FFFF');
    doc.roundedRect(46, 299, 520, 153, 9).fill(background);
    doc.roundedRect(57, 308, 135, 135, 8).fill('#FFFFFF');
    doc.save().roundedRect(57, 308, 135, 135, 8).clip();
    doc.image(qrCode, 57, 308, { width: 135, height: 135 });
    doc.restore();

    const surnames = normalizeText(body.lastName)
        || [body.paternSurname, body.maternSurname].map(normalizeText).filter(Boolean).join(' ');
    const fullName = [normalizeText(body.name), surnames].filter(Boolean).join(' ');
    const fields = [
        fitVisitorField(doc, normalizeText(body.company).toLocaleUpperCase('es-MX'), 'semiBold', 32),
        fitVisitorField(doc, normalizeText(body.position), 'semiBold', 27),
        fitVisitorField(doc, fullName, 'regular', 35),
    ].filter((field) => field.text);
    const gaps = fields.map((field, index) => index < fields.length - 1 ? (index === 0 ? 16 : 1) : 0);
    const contentHeight = fields.reduce((height, field, index) => height + field.height + gaps[index], 0);
    let y = 299 + (153 - contentHeight) / 2;

    fields.forEach((field, index) => {
        drawText(doc, field.text, 211, y, 342, {
            font: field.font, size: field.size, height: field.maxHeight, ellipsis: true,
        });
        y += field.height + gaps[index];
    });
}

function drawVisitorPass(doc, body, qrCode) {
    doc.registerFont('regular', path.join(fontDirectory, 'Montserrat-Regular.ttf'));
    doc.registerFont('semiBold', path.join(fontDirectory, 'Montserrat-SemiBold.ttf'));
    doc.registerFont('extraBold', path.join(fontDirectory, 'Montserrat-ExtraBold.ttf'));
    doc.registerFont('italic', path.join(fontDirectory, 'Montserrat-Italic.ttf'));

    doc.image(path.join(artworkDirectory, 'header.jpg'), 0, 0, { width: 612 });
    drawHeading(doc, 'Tu registro está confirmado', 'Your registration is confirmed', 138);
    drawText(doc,
        'Gracias por registrarte a RE+ MEXICO 2027. Tu registro incluye acceso al piso de exposición, acceso sin costo a dos escenarios de conferencias y espacios de networking para conectar con empresas, especialistas y profesionales de la industria.',
        46, 172, 520, { font: 'semiBold', size: 11 });
    drawText(doc,
        'Thank you for registering for RE+ MEXICO 2027. Your registration includes access to the exhibition floor, complimentary access to two conference stages and networking spaces where you can connect with companies, industry experts and professionals.',
        46, 217, 520, { size: 9.8 });

    doc.moveTo(46, 259).lineTo(566, 259).lineWidth(0.5).stroke('#A0A0A0');
    drawHeading(doc, 'Tu código de registro', 'Your registration code', 268);
    drawVisitorCard(doc, body, qrCode);

    drawText(doc, '¿Cómo recoger tu gafete?', 46, 460, 520, {
        font: 'semiBold', size: 11, underline: true,
    });
    drawText(doc,
        'Presenta este comprobante en los módulos de registro de Expo Guadalajara. Nuestro equipo validará tu código y te entregará tu gafete de visitante.',
        46, 473, 520, { font: 'semiBold', size: 11 });
    drawText(doc, 'How to collect your badge', 46, 506, 520, { size: 9.8, underline: true });
    drawText(doc,
        'Present this confirmation at the registration counters at Expo Guadalajara. Our team will validate your code and provide your visitor badge.',
        46, 518, 520, { size: 9.8 });

    doc.image(path.join(artworkDirectory, 'prepare-visit.jpg'), 46, 548, { width: 520 });
    doc.link(214, 548, 184, 31, eventWebsite);

    doc.image(path.join(artworkDirectory, 'calendar.jpg'), 46, 592, { width: 24 });
    drawText(doc, '20 al 22 de abril\nde 2027', 75, 592, 111, { font: 'semiBold', size: 11 });

    doc.image(path.join(artworkDirectory, 'location.jpg'), 190, 591, { width: 28 });
    drawText(doc, 'Expo Guadalajara', 222, 592, 156, { font: 'semiBold', size: 11 });
    drawText(doc, 'Guadalajara, Jalisco, México', 222, 606, 156, { size: 9.8 });
    doc.image(path.join(artworkDirectory, 'clock.jpg'), 382, 592, { width: 25 });
    drawText(doc, 'Horario de visita:', 413, 587, 153, { font: 'semiBold', size: 11 });
    drawText(doc, '20 y 21 de abril: 11:00 a 18:00 hrs.\n22 de abril: 11:00 a 17:00 hrs.',
        413, 600, 153, { size: 9.3 });

    doc.moveTo(46, 633).lineTo(566, 633).lineWidth(0.7).stroke('#FF0068');
    drawText(doc,
        'Consulta el directorio de expositores y el programa de actividades para identificar las soluciones y conexiones relevantes para tu negocio.',
        46, 642, 520, { font: 'semiBold', size: 11 });
    drawText(doc,
        'Explore the exhibitor directory and event program to identify the solutions and business connections most relevant to you.',
        46, 674, 520, { size: 9.8 });

    doc.image(path.join(artworkDirectory, 'premium.jpg'), 0, 703.8, { width: 612 });
    doc.link(82, 815, 278, 24, premiumWebsite);
    doc.image(path.join(artworkDirectory, 'footer.jpg'), 0, 858.636, { width: 612 });
    doc.link(459, 858.636, 107, 35.496, eventWebsite);
    drawText(doc, 'No es necesario imprimir este comprobante. / No printing required.',
        46, 903, 520, { font: 'italic', size: 7.2, align: 'center' });
}

export async function generateVisitorPass(body, uuid) {
    const qrCode = await QRCode.toDataURL(uuid, {
        width: 720, margin: 4, errorCorrectionLevel: 'M',
    });
    const outputDirectory = path.resolve(serverDirectory, '../invoices');
    await fs.promises.mkdir(outputDirectory, { recursive: true });
    const pdfSave = path.join(outputDirectory, `${uuid}.pdf`);
    // Keep the 2:3 proportions of the supplied reference on a single page.
    const doc = new PDFDocument({
        size: [612, 918], margin: 0,
        info: { Title: 'CONFIRMACIÓN DE REGISTRO | RE+ MEXICO 2027', Author: 'RE+ MEXICO' },
    });

    return new Promise((resolve, reject) => {
        const pdfStream = fs.createWriteStream(pdfSave);
        const fail = (error) => {
            doc.destroy();
            pdfStream.destroy();
            reject(error);
        };
        doc.once('error', fail);
        pdfStream.once('error', fail);
        pdfStream.once('finish', () => resolve(pdfSave));
        doc.pipe(pdfStream);

        try {
            drawVisitorPass(doc, body, qrCode);
            doc.end();
        } catch (error) {
            fail(error);
        }
    });
}
