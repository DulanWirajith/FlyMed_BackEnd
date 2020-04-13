const express = require('express');
const router = express.Router();

const SupplierController = require('./../controllers/supplier_controller');
const EstimationToCustomerController = require('./../controllers/estimation_to_customer_controller');

router.post('/register', SupplierController.register);
router.post('/cancel_order_by_supplier', SupplierController.requestedConfirmedOrderCancel);


router.post('/send_estimation', EstimationToCustomerController.sendEstimation);//order ekakata estimation ekak yawana eka




module.exports = router;
