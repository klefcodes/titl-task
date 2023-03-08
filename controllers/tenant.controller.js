const { response } = require("../config");
const { tenantService } = require("../services");

const waive = async (req, res) => {
  const { id } = req.params;
  const { waivedMonth } = req.body;
  try {
    const tenant = await tenantService.edit(
      { waivedMonth: new Date(waivedMonth) },
      id
    );
    response(res, 200, "Rent waived successfully.", tenant);
  } catch (error) {
    response(res, 400, error.message);
  }
};

const discount = async (req, res) => {
  const { id } = req.params;
  const { rentalDiscount } = req.body;

  try {
    const tenant = await tenantService.edit(
      { rentalDiscount: parseFloat(rentalDiscount) },
      id
    );
    response(res, 200, "Rental discount applied successfully.", tenant);
  } catch (error) {
    response(res, 400, error.message);
  }
};

const expense = async (req, res) => {
  const { id } = req.params;
  const { expense } = req.body;

  try {
    const tenant = await tenantService.edit(
      { expense: parseFloat(expense) },
      id
    );
    response(res, 200, "Expense added successfully.", tenant);
  } catch (error) {
    response(res, 400, error.message);
  }
};

const tenantController = { waive, discount, expense };

module.exports = tenantController;
