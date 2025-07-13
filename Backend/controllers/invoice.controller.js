import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoice = async (req, res) => {
  const { dealerName, item, price, date, phone } = req.body;

  const doc = new PDFDocument();
  const filename = `invoice-${Date.now()}.pdf`;
  const filePath = path.join('uploads', filename);

  // Pipe PDF to file
  doc.pipe(fs.createWriteStream(filePath));

  // Add content
  doc.fontSize(20).text('Kisan App - Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Dealer Name: ${dealerName}`);
  doc.text(`Phone: ${phone}`);
  doc.text(`Item: ${item}`);
  doc.text(`Price: Rs ${price}`);
  doc.text(`Date: ${date}`);
  doc.moveDown();
  doc.text('Thank you for using Kisan App!', { align: 'center' });

  doc.end();

  // Send file URL
  res.status(200).json({ downloadUrl: `/uploads/${filename}` });
};
