const { response } = require("../config");
const { invoiceService } = require("../services");

const getInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.getInvoices(req.params.id);
    response(res, 200, "Invoices retrieved successfully", invoices);
  } catch (err) {
    console.error(err);
    response(res, 500, "Internal server error");
  }
};

const generateInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await invoiceService.generateInvoice(id, req.body);
    response(res, 200, "Invoice generated successfully", invoice);
  } catch (error) {
    response(res, 400, error.message);
  }
};

const invoiceController = { getInvoices, generateInvoice };

module.exports = invoiceController;
