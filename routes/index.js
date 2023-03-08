const { Router } = require("express");
const {
  index,
  invoiceController,
  tenantController,
} = require("../controllers");

const router = Router();

router.get("/", index);

// Endpoint to generate invoice for a tenant
router.post("/tenants/:id/invoice", invoiceController.generateInvoice);
// Endpoint to get all invoices belonging to a tenant
router.get("/tenants/:id/invoices", invoiceController.getInvoices);
// Endpoint to waive a tenant's invoice
router.post("/tenants/:id/waive", tenantController.waive);
// Endpoint to give a rental discount
router.post("/tenants/:id/discount", tenantController.discount);
// Endpoint to charge an expense to a tenant
router.post("/tenants/:id/expense", tenantController.expense);

module.exports = router;
