const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const { createWriteStream } = require("fs");

async function generatePdf(invoice) {
  console.log({ invoice });
  const doc = new PDFDocument();

  doc.pipe(createWriteStream(`invoices/${invoice.id}.pdf`));

  doc.fontSize(18).text("Invoice", { align: "center" });
  doc.fontSize(14).text(`Tenant: ${invoice.tenant.name}`);
  doc.fontSize(14).text(`Unit: ${invoice.tenant.unitName}`);
  doc.fontSize(14).text(`Amount due: UGX ${invoice.amountDue}`);

  doc.end();

  return `invoices/${invoice.id}.pdf`;
}

async function sendInvoiceByEmail(email, pdfPath) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Invoice",
    text: "Please find attached your monthly rent invoice.",
    attachments: [
      {
        filename: "invoice.pdf",
        path: pdfPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
}

const response = (res, status, message, data = {}) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

module.exports = { generatePdf, sendInvoiceByEmail, response };
