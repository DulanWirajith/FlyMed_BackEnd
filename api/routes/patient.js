const express = require('express');
const router = express.Router();

const PatientController = require('./../controllers/patient_controller');

router.post('/register', PatientController.register);
