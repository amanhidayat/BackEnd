const router = require('express').Router();

const { expenseController } = require('../controller');

router.get("/total", expenseController.getTotalByCategory)
router.get("/date", expenseController.getTotalByDate);
router.get("/", expenseController.getAll);
router.get("/:id", expenseController.getById);
router.post("/", expenseController.postExpense);
router.delete("/:id", expenseController.deleteById);
router.patch("/:id", expenseController.editById);

module.exports = router


