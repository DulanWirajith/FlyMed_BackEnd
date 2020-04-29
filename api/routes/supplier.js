const express = require('express');
const router = express.Router();

const SupplierController = require('./../controllers/supplier_controller');
const EstimationToCustomerController = require('./../controllers/estimation_to_customer_controller');

router.post('/register', SupplierController.register);
router.post('/cancel_order_by_supplier', SupplierController.requestedConfirmedOrderCancel);


// Estimation to Customer
router.post('/send_estimation', EstimationToCustomerController.sendEstimation);//order ekakata estimation ekak yawana eka
router.post('/final_billing', EstimationToCustomerController.finalBilling);//confirmed_order_queue eke thiyena confirm estimation ekakata invoice ekak yawana eka

module.exports = router;
