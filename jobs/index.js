const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const { generatePdf, sendInvoiceByEmail } = require("../config");

const prisma = new PrismaClient();

const invoiceJob = () =>
  cron.schedule("0 0 1 * *", async () => {
    const tenants = await prisma.tenant.findMany();

    for (const tenant of tenants) {
      const { id, email, rentAmount, waivedMonth, rentalDiscount, expenses } =
        tenant;

      if (waivedMonth && new Date() < waivedMonth) {
        continue;
      }

      const amountDue =
        rentAmount -
        (rentAmount * (rentalDiscount || 0)) / 100 +
        (expenses || 0);

      const invoice = await prisma.invoice.create({
        data: {
          tenantId: id,
          amountDue,
        },
      });

      const pdfBuffer = await generatePdf(invoice);
      await sendInvoiceByEmail(email, pdfBuffer);

      if (
        new Date() >
        new Date(Date.parse(waivedMonth || "") + 30 * 24 * 60 * 60 * 1000)
      ) {
        await prisma.tenant.update({
          where: {
            id,
          },
          data: {
            waivedMonth: null,
          },
        });
      }

      if (
        new Date() >
        new Date(Date.parse(waivedMonth || "") + 60 * 24 * 60 * 60 * 1000)
      ) {
        await prisma.tenant.update({
          where: {
            id,
          },
          data: {
            rentalDiscount: null,
          },
        });
      }

      if (
        new Date() >
        new Date(Date.parse(waivedMonth || "") + 90 * 24 * 60 * 60 * 1000)
      ) {
        await prisma.tenant.update({
          where: {
            id,
          },
          data: {
            expenses: null,
          },
        });
      }
    }
  });
const task = { invoiceJob };
module.exports = task;
