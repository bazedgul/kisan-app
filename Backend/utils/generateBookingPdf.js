import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateBookingPdf = (booking, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text('Booking Confirmation', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Booking ID: ${booking._id}`);
    doc.text(`Type: ${booking.type}`);
    doc.text(`Date: ${booking.date}`);
    doc.text(`Location: ${booking.location}`);
    if (booking.type === 'seed') {
      doc.text(`Seed: ${booking.seed}`);
      doc.text(`Quantity: ${booking.quantity}`);
    } else {
      doc.text(`Tractor: ${booking.tractor}`);
    }
    doc.text(`Status: ${booking.status}`);
    doc.text(`Created At: ${booking.createdAt}`);

    doc.end();
    doc.on('finish', () => resolve(filePath));
    doc.on('error', reject);
  });
};
