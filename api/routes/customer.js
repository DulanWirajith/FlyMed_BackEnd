const express = require('express');
const router = express.Router();

const CustomerController = require('./../controllers/customer_controller');

router.post('/register', CustomerController.register);
router.post('/add_order', CustomerController.addOrder);

module.exports = router;
