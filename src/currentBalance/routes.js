const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/', controller.getCurrentBalance);
router.put('/', controller.updateCurrentBalance);

module.exports = router;