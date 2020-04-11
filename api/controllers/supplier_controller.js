const Supplier = require('./../db/supplier');
const Response = require('./../../config/Response');

exports.register = (req, res, next) => {
  Supplier.save(req.body).then(savedSupplier => {
    Response.create(res, 200, 'saved', savedSupplier);
  }).catch(err => {
    console.log(err);
    Response.create(res, 500, 'server error', err);
  })
};
