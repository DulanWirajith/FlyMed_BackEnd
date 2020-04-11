const express = require('express');
const router = express.Router();

const PatientController = require('./../controllers/patient_controller');

router.post('/register', PatientController.register);
// router.post('/add_order', PatientController.addOrder);

module.exports = router;
