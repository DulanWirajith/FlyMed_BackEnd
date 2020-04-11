const Customer = require('./../db/customer');
const Response = require('./../../config/Response');

exports.register = (req, res, next) => {
  Customer.save(req.body).then(savedCustomer => {
    Response.create(res, 200, 'saved', savedCustomer);
  }).catch(err => {
    console.log(err);
    Response.create(res, 500, 'server error', err);
  })
};
