const CustomerOrder = require('./../db/customer_order');
const Customer = require('./../db/customer');
const Supplier = require('./../db/supplier');

const Response = require('./../../config/Response');


exports.addOrder = (req, res, next) => {
  // console.log(req.body.customer_id);
  var order_id_by_us;
  Customer.search_customer({
    _id: req.body.customer_id
  }).then(searchedCustomer => {
    if (searchedCustomer.ongoing_orders < 6) {
      // set our order id
      CustomerOrder.findAll().then(all_orders => {
        var all_orders_length = all_orders.length;
        order_id_by_us = "tasiri" + all_orders_length;
        console.log(order_id_by_us);

        // send to supplier normal_order_queue and save data to database
        var selected_suppliers = req.body.selected_supplier_ids;
        if (selected_suppliers.length < 11) {
          // add to supplier normal_order_queue
          for (var i = 0; i < selected_suppliers.length; i++) {
            Supplier.search_supplier({
              _id: selected_suppliers[i]
            }).then(selected_supplier => {
              var normal_order_queue = selected_supplier.normal_order_queue;
              normal_order_queue.push(order_id_by_us);
              console.log(normal_order_queue);

              Supplier.updateOne({
                _id: selected_supplier._id
              }, {
                $set: {
                  normal_order_queue: normal_order_queue
                }
              }).then(updated_supplier => {
                console.log("added supplier notifications");
              }).catch(error => {
                console.log(error);
              });

            }).catch(error => {

            });
            // console.log(selected_suppliers[i]);
          }

          CustomerOrder.save(req.body).then(my_order => {
            CustomerOrder.updateOne({
              _id: my_order._id
            }, {
              $set: {
                order_id_by_us: order_id_by_us
              }
            }).then(updated_order=>{
              console.log(updated_order);
              res.status(200).json({
                message: 'Order added successfully. Sent notifications to Suppliers'
              });
            }).catch(error=>{
              console.log(error);
            });

          }).catch(error => {
            console.log(error);
          });
        }

      }).catch(error => {
        res.status(400).json({
          message: 'Internal Server Error'
        });
      });

      // console.log(searchedCustomer);

    } else {
      res.status(500).json({
        message: 'You have exceed ongoing_orders limit'
      });
    }
    // Response.create(res, 200, 'saved', savedCustomer);
  }).catch(err => {
    Response.create(res, 500, 'server error', err);
  })
}
