const Patient = require('./../db/patient');
const Response = require('./../../config/Response');

exports.register = (req, res, next) => {
  Patient.save(req.body).then(savedPatient => {
    Response.create(res, 200, 'saved', savedPatient);
  }).catch(err => {
    Response.create(res, 500, 'server error', err);
  })
};
