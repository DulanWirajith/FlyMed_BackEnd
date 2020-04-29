const Customer = require('./../db/customer');
const Response = require('./../../config/Response');
const EstimationToCustomer = require('./../db/estimation_to_customer');
const PharmacyOrder = require('./../db/pharmacy_order');

exports.register = (req, res, next) => {
  Customer.save(req.body).then(savedCustomer => {
    Response.create(res, 200, 'saved', savedCustomer);
  }).catch(err => {
    console.log(err);
    Response.create(res, 500, 'server error', err);
  })
};
