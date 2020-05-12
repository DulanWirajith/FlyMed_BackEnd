const express = require('express');
const router = express.Router();

const CustomerController = require('./../controllers/customer_controller');
const CustomerOrderController = require('./../controllers/customer_order_controller');
const EstimationToCustomerController = require('./../controllers/estimation_to_customer_controller');
const TempCustomerOrderController = require('./../controllers/temp_customer_order_controller');


router.post('/register', CustomerController.register);




// CustomerOrder
router.post('/check_ban', CustomerOrderController.checkBanned);//me time eke customer banned welaada inne kiyala denaganna
router.post('/add_pharm_order', CustomerOrderController.addPharmacyOrder); //order ekak place karanna
router.post('/going_to_cancel_pharm_order', CustomerOrderController.goingToCancelPharmacyOrder); //order ekak cancel karoth mokakda wenne kiyala userta denaganna
router.post('/cancel_pharm_order', CustomerOrderController.cancelPharmacyOrder);//order eka cancel karana eka
router.post('/confirm_estimation', CustomerOrderController.acceptAndConfirmEstimation);//estimation eka accept karana eka
router.post('/confirm_estimation_with_new_requirements', CustomerOrderController.changeRequirementsConsiderFinalOrder);//estimation eka modify karala final order ekak widiyata consider karanna kiyana eka
router.post('/add_temp_order', TempCustomerOrderController.add_temp_order);//estimation eka modify karala final order ekak widiyata consider karanna kiyana eka
router.post('/remove_temp_order', TempCustomerOrderController.remove_temp_order);//estimation eka modify karala final order ekak widiyata consider karanna kiyana eka


// Estimation to Customer
router.get('/view_pharm_estimation/:estimation_id', EstimationToCustomerController.viewPharmEstimation);//estimation eka balana eka
router.post('/decline_pharm_estimation', EstimationToCustomerController.declinePharmEstimation);//estimation eka decline karana eka
router.post('/request_new_estimation', EstimationToCustomerController.changeRequirementsNeedNewEstimation);//estimation eka modify karala aluth estimation ekak equest karana eka



module.exports = router;
