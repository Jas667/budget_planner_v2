const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getAllCategoriesInfo);
router.get('/:id', controller.getCategoryById);
router.delete('/:id', controller.deleteById);
router.post('/', controller.addNewCategory);

module.exports = router;