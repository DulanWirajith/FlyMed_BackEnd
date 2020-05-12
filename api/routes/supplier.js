const express = require('express');
const router = express.Router();

const SupplierController = require('./../controllers/supplier_controller');
const EstimationToCustomerController = require('./../controllers/estimation_to_customer_controller');
const CustomerOrderController = require('./../controllers/customer_order_controller');


router.post('/register', SupplierController.register);


// Estimation to Customer
router.post('/send_estimation', EstimationToCustomerController.sendEstimation);//order ekakata estimation ekak yawana eka
router.post('/final_billing', EstimationToCustomerController.finalBilling);//confirmed_order_queue eke thiyena confirm estimation ekakata invoice ekak yawana eka


// CustomerOrder
router.get('/view_order_notification/:order_id/:supplier_id', CustomerOrderController.viewOrderNotificationBySupplier);//order ekak balana eka
router.post('/decline_order_notification', CustomerOrderController.declineOrderNotificationBySupplier);//order ekak decline karana eka
// router.post('/cancel_confiorder_by_supplier', CustomerOrderController.cancelConfirmedPharmOrder);// confirm una order ekak cancel karana eka



module.exports = router;
