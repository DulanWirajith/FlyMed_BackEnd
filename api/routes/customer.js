const express = require('express');
const router = express.Router();

const CustomerController = require('./../controllers/customer_controller');
const CustomerOrderController = require('./../controllers/customer_order_controller');


router.post('/register', CustomerController.register);


// CustomerOrder
router.post('/check_ban', CustomerOrderController.checkBanned);//me time eke customer banned welaada inne kiyala denaganna
router.post('/add_order', CustomerOrderController.addOrder); //order ekak place karanna
router.post('/going_to_cancel_order', CustomerOrderController.goingToCancelOrder); //order ekak cancel karoth mokakda wenne kiyala userta denaganna
router.post('/cancel_order', CustomerOrderController.cancelOrder);//order eka cancel karana eka

module.exports = router;
