const express = require('express');
const router = express.Router();

const CustomerController = require('./../controllers/customer_controller');
const CustomerOrderController = require('./../controllers/customer_order_controller');


router.post('/register', CustomerController.register);


// CustomerOrder
router.post('/add_order', CustomerOrderController.addOrder);

module.exports = router;
