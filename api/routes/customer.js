const express = require('express');
const router = express.Router();

const CustomerController = require('./../controllers/customer_controller');
const CustomerOrderController = require('./../controllers/customer_order_controller');


router.post('/register', CustomerController.register);


// CustomerOrder
router.post('/check_ban', CustomerOrderController.checkBanned);//me time eke customer banned welaada inne kiyala denaganna
router.post('/add_pharm_order', CustomerOrderController.addPharmacyOrder); //order ekak place karanna
router.post('/going_to_cancel_pharm_order', CustomerOrderController.goingToCancelPharmacyOrder); //order ekak cancel karoth mokakda wenne kiyala userta denaganna
router.post('/cancel_pharm_order', CustomerOrderController.cancelPharmacyOrder);//order eka cancel karana eka
router.post('/confirm_estimation', CustomerOrderController.acceptAndConfirmEstimation);//estimation eka accept karana eka



module.exports = router;
