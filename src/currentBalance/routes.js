const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getCurrentBalance);
router.put('/', controller.updateCurrentBalance);
router.put('/add', controller.addToCurrentBalance);
router.put('/subtract', controller.subtractFromCurrentBalance);

module.exports = router;