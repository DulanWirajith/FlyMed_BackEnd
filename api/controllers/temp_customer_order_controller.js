const Temp_Customer_Order = require('./../db/temp_customer_order');
const Response = require('./../../config/Response');

exports.add_temp_order = (req, res, next) => {
  Temp_Customer_Order.saveorder(req.body).then(savedOrder => {
    // Response.create(res, 200, 'saved', savedSupplier);
    console.log(savedOrder);
  }).catch(err => {
    console.log(err);
    Response.create(res, 500, 'server error', err);
  })
};


exports.remove_temp_order = (req, res, next) => {
  Temp_Customer_Order.remove({
    order_id: req.body.order_id
  }).then(savedOrder => {
    // Response.create(res, 200, 'saved', savedSupplier);
    console.log(savedOrder);
  }).catch(err => {
    console.log(err);
    Response.create(res, 500, 'server error', err);
  })
};
