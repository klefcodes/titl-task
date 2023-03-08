const invoiceController = require("./invoice.controller");
const tenantController = require("./tenant.controller");

const index = (req, res) => {
  res.json({ message: "Hello World" });
};

module.exports = { index, invoiceController, tenantController };
