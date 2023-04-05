const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getAllExpenses);
router.get('/:id', controller.getExpenseById);
router.get('/category/:id', controller.getExpensesByCategory);
router.delete('/:id', controller.deleteExpenseById);
router.put('/', controller.updateExpenseById);
router.post('/', controller.addNewExpense);

module.exports = router;