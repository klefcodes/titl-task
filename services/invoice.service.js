const { PrismaClient } = require("@prisma/client");
const { generatePdf, sendInvoiceByEmail } = require("../config");

const prisma = new PrismaClient();

const generateInvoice = async (tenantId) => {
  try {
    // Retrieve the tenant by ID
    const tenant = await prisma.tenant.findUnique({
      where: { id: parseInt(tenantId) },
    });

    // Calculate the amount due based on the tenant's rental agreement terms
    const { rentAmount, waivedMonth, rentalDiscount, expenses } = tenant;
    let amountDue =
      rentAmount - (rentAmount * (rentalDiscount || 0)) / 100 + (expenses || 0);

    // If rent is waived for the month, set the amount due to 0
    if (waivedMonth && new Date() < waivedMonth) {
      amountDue = 0;
    }

    // Create the invoice in the database
    const invoice = await prisma.invoice.create({
      data: {
        tenantId: parseInt(tenantId),
        amountDue,
      },
    });

    const getInvoice = await prisma.invoice.findUnique({
      where: { id: invoice.id },
      include: {
        tenant: true,
      },
    });

    // Generate and email the invoice
    const pdf = await generatePdf(getInvoice);
    await sendInvoiceByEmail(tenant.email, pdf);

    return invoice;
  } catch (error) {
    throw error;
  }
};

const getInvoices = async (tenantId) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      tenantId: parseInt(tenantId),
    },
  });

  return invoices;
};

const invoiceService = { getInvoices, generateInvoice };

module.exports = invoiceService;
