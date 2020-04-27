const CustomerOrder = require('./../db/customer_order');
const Customer = require('./../db/customer');
const Supplier = require('./../db/supplier');
const EstimationToCustomer = require('./../db/estimation_to_customer');
const TrackMyID = require('./../db/track_my_id');


const Response = require('./../../config/Response');


exports.sendEstimation = (req, res, next) => {
  EstimationToCustomer.findOne({
    order_id: req.body.order_id,
    supplier_id: req.body.supplier_id
  }).then(addedEstimation => {
    if (addedEstimation == null) {
      EstimationToCustomer.save(req.body).then(myestimation1 => {
        console.log("estimation added");
        var estimation_id = myestimation1._id;
        var order_id = myestimation1.order_id;
        CustomerOrder.findOne({
          order_id_by_us: order_id
        }).then(customerOrder1 => {
          // console.log(customerOrder1);
          var estimation_nums_to_order = customerOrder1.estimation_nums_to_order;
          var unanswered_estimation_nums_to_order = customerOrder1.unanswered_estimation_nums_to_order;
          estimation_nums_to_order.push(estimation_id);
          unanswered_estimation_nums_to_order.push(estimation_id);
          CustomerOrder.updateOne({
            order_id_by_us: order_id
          }, {
            $set: {
              estimation_nums_to_order: estimation_nums_to_order,
              unanswered_estimation_nums_to_order: unanswered_estimation_nums_to_order
            }
          }).then(updatedOrder1 => {
            console.log("estimation send to order");
            Supplier.search_supplier({
              _id: req.body.supplier_id
            }).then(supplier => {
              var normal_order_queue = supplier.normal_order_queue;
              console.log(normal_order_queue);
              // normal_order_queue.pop(req.body.order_id);
              var index = normal_order_queue.indexOf(req.body.order_id);
              if (index > -1) {
                normal_order_queue.splice(index, 1);
              }
              Supplier.updateOne({
                _id: req.body.supplier_id
              }, {
                $set: {
                  normal_order_queue: normal_order_queue
                }
              }).then(updatedSup => {
                res.status(200).json({
                  message: 'estimation send to order'
                });
              }).catch(error => {
                res.status(400).json({
                  message: 'Internal Server Error'
                });
              });
            }).catch(error => {
              res.status(400).json({
                message: 'Internal Server Error'
              });
            });

          }).catch(error3 => {
            res.status(400).json({
              message: 'Internal Server Error'
            });
          });
        }).catch(error2 => {
          res.status(400).json({
            message: 'Internal Server Error'
          });
        });
      }).catch(error1 => {
        console.log(error1);
        res.status(400).json({
          message: 'Internal Server Error'
        });
      });
    } else {
      res.status(200).json({
        message: 'already added'
      });
      console.log("already added");
    }
  }).catch(error4 => {
    console.log(error4);
    res.status(400).json({
      message: 'Internal Server Error'
    });
  });
};


exports.finalBilling = (req, res, next) => {

  EstimationToCustomer.updateOne({
    _id: req.body.estimation_id
  }, {
    $set: {
      invoice_date: req.body.invoice_date,
      invoice_time: req.body.invoice_time,
      total_net_amount: req.body.total_net_amount,
      cancelled_items: req.body.cancelled_items,
      available_items: req.body.available_items,
    }
  }).then(estimation1 => {
    console.log("invoice maked!!!...");
    console.log(estimation1);
    TrackMyID.findOne({
      estimation_id: req.body.estimation_id
    }).then(track_my_id => {
      console.log(track_my_id);
      console.log(track_my_id.order_id);
      CustomerOrder.findOne({
        order_id_by_us: track_my_id.order_id
      }).then(custOrder => {
        Customer.search_customer({
          _id: custOrder.customer_id
        }).then(customer => {
          console.log(customer);
          var invoices_received_queue = customer.invoices_received_queue;
          invoices_received_queue.push(track_my_id.track_id);

          Customer.updateOne({
            _id: custOrder.customer_id
          }, {
            $set: {
              invoices_received_queue: invoices_received_queue
            }
          }).then(updatedCust => {

          }).catch();
        }).catch();
      }).catch();
    }).catch();


  }).catch(error => {
    console.log(error);
  });


};
