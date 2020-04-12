const CustomerOrder = require('./../db/customer_order');
const Customer = require('./../db/customer');
const Supplier = require('./../db/supplier');

const Response = require('./../../config/Response');

// check is baned user
exports.checkBanned = (req, res, next) => {
  Customer.search_customer({
    _id: req.body.customer_id
  }).then(searchedCustomer => {
    var banned_date = searchedCustomer.banned_date;
    var banned_time = searchedCustomer.banned_time;
    var banned_hours = searchedCustomer.banned_hours;
    var banned_date_time = banned_date + ' ' + banned_time;
    var today_date_and_time = req.body.date + ' ' + req.body.time;
    var diff = Math.abs(new Date(today_date_and_time) - new Date(banned_date_time));
    var minutes = Math.floor((diff / 1000) / 60);
    console.log(minutes);

    if (minutes > banned_hours * 60) {
      console.log('not banned');
      res.status(200).json({
        message: 'not banned'
      });
    } else {
      console.log('banned');
      res.status(200).json({
        message: 'banned'
      });
    }
  }).catch(error => {
    res.status(400).json({
      message: 'Internal Server Error'
    });
  });
}


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
                res.status(400).json({
                  message: 'Internal Server Error'
                });
              });

            }).catch(error => {
              res.status(400).json({
                message: 'Internal Server Error'
              });
            });

          }

          CustomerOrder.save(req.body).then(my_order => {
            CustomerOrder.updateOne({
              _id: my_order._id
            }, {
              $set: {
                order_id_by_us: order_id_by_us
              }
            }).then(updated_order => {
              console.log(updated_order);
              res.status(200).json({
                message: 'Order added successfully. Sent notifications to Suppliers'
              });
            }).catch(error => {
              console.log(error);
              res.status(400).json({
                message: 'Internal Server Error'
              });
            });

          }).catch(error => {
            console.log(error);
            res.status(400).json({
              message: 'Internal Server Error'
            });
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
exports.goingToCancelOrder = (req, res, next) => {

  CustomerOrder.findOne({
    _id: req.body.order_id
  }).then(searched_order => {
    if (searched_order.unanswered_estimation_nums_to_order.length < 1) {
      if (searched_order.waiting_another_response_for_estimation.length < 1) {
        if (searched_order.my_track_id != null) {
          // confirmed una order ekak nam (trackid ekak thiyena ekak)
          if (searched_order.already_request_confirm_order_cancelleration = true) {
            res.status(200).json({
              message: 'cant send order cancelleration request. You already request order cancelleration.'
            });
          } else {
            res.status(200).json({
              message: 'The order is confirmed..You can only request to supplier for cancel the order. If order canelled you are banned for 4 hours.'
            });
          }
        } else {
          // unconfirmed order ekak
          var today_date_and_time = req.body.date + ' ' + req.body.time;;
          var order_placed_date_and_time = searched_order.order_date + ' ' + searched_order.order_time;
          var diff = Math.abs(new Date(today_date_and_time) - new Date(order_placed_date_and_time));

          var minutes = Math.floor((diff / 1000) / 60);
          console.log(minutes);
          if (minutes > 24 * 60) {
            //24h gihinda => ban nee
            console.log('24h pahu wela');
            res.status(200).json({
              message: 'You can cancel the order.'
            });
          } else {
            console.log('24h pahu wela nee');
            var no_of_selected_suppliers = searched_order.selected_supplier_ids.length;
            var no_of_attends_to_my_order = searched_order.no_of_attends_to_my_order;
            var precentage = (no_of_attends_to_my_order / no_of_selected_suppliers) * 100;

            if (precentage > 60) {
              console.log('60%ta wedi');
              res.status(200).json({
                message: 'You can cancel the order.'
              });
            } else {
              console.log('60%ta adui');
              res.status(200).json({
                message: 'If you cancel order,you are banned for 2 hours.'
              });
            }
          }
          // const diffDays = Math.ceil(diffTime / (1000));

        }
      } else {
        res.status(200).json({
          message: 'You are waiting for reply from suppliers..You cant cancel order. please wait...'
        });
      }
    } else {
      res.status(200).json({
        message: 'There have unanswered estimations..You cant cancel order. please answer to estimations'
      });
    }
  }).catch(error => {
    console.log(error);
  });
}

exports.cancelOrder = (req, res, next) => {
  console.log(req.body);
  CustomerOrder.findOne({
    _id: req.body.order_id
  }).then(searched_order => {
    if (searched_order.unanswered_estimation_nums_to_order.length < 1) {
      if (searched_order.waiting_another_response_for_estimation.length < 1) {
        console.log(searched_order);
        if (searched_order.my_track_id != null) {
          // confirmed una order ekak nam (trackid ekak thiyena ekak).
          // call ekak yanna oona supplier ta
          if (searched_order.already_request_confirm_order_cancelleration == true) {
            res.status(200).json({
              message: 'cant send order cancelleration request. You already request order cancelleration.'
            });
          } else {
            Supplier.search_supplier({
              _id: searched_order.order_confirmed_supplier_id
            }).then(order_confirmed_supplier => {
              console.log(order_confirmed_supplier);
              var confirmed_order_cancelling_requests_by_customer_queue = order_confirmed_supplier.confirmed_order_cancelling_requests_by_customer_queue;
              confirmed_order_cancelling_requests_by_customer_queue.push({
                track_id: searched_order.my_track_id,
                reason: req.body.reason,
                estimation_id: searched_order.confirmed_estimation_id,
                is_cancelled: false,
                date: req.body.date,
                time: req.body.time
              });
              Supplier.updateOne({
                _id: order_confirmed_supplier._id
              }, {
                $set: {
                  confirmed_order_cancelling_requests_by_customer_queue: confirmed_order_cancelling_requests_by_customer_queue
                }
              }).then(updated_supplier => {
                CustomerOrder.updateOne({
                  _id: searched_order._id
                }, {
                  $set: {
                    already_request_confirm_order_cancelleration: true
                  }
                }).then(updated_order => {
                  console.log(updated_order);
                  res.status(200).json({
                    message: 'Your order cancel request sent to supplier. Waif for response from supplier.'
                  });
                }).catch(error => {
                  console.log(error);
                  res.status(400).json({
                    message: 'Internal Server Error'
                  });
                });

              }).catch(error => {
                console.log(error);
                res.status(400).json({
                  message: 'Internal Server Error'
                });
              });
            }).catch(error => {
              console.log(error);
              res.status(400).json({
                message: 'Internal Server Error'
              });
            });
          }

        } else {
          // unconfirmed order ekak
          CustomerOrder.findOne({
            _id: req.body.order_id
          }).then(myorder => {
            if (myorder.order_status == 'pending') {
              var today_date_and_time = req.body.date + ' ' + req.body.time;
              var order_placed_date_and_time = searched_order.order_date + ' ' + searched_order.order_time;
              var diff = Math.abs(new Date(today_date_and_time) - new Date(order_placed_date_and_time));

              var minutes = Math.floor((diff / 1000) / 60);
              console.log(minutes);
              if (minutes > 24 * 60) {
                //24h gihinda => ban nee
                console.log('24h pahu wela');
                for (var i = 0; i < searched_order.selected_supplier_ids.length; i++) {
                  // console.log(searched_order.selected_supplier_ids[i]);
                  Supplier.search_supplier({
                    _id: searched_order.selected_supplier_ids[i]
                  }).then(searched_supplier => {
                    // console.log(searched_supplier.normal_order_queue);
                    var normal_order_queue = searched_supplier.normal_order_queue;
                    var cancelling_order_id_by_us = searched_order.order_id_by_us;
                    // console.log(cancelling_order_id_by_us);
                    normal_order_queue.pop(cancelling_order_id_by_us);
                    // console.log(normal_order_queue);
                    Supplier.updateOne({
                      _id: searched_supplier._id
                    }, {
                      $set: {
                        normal_order_queue: normal_order_queue
                      }
                    }).then(updated_supplier => {
                      // console.log(updated_supplier);

                    }).catch(error => {
                      console.log(error);
                      res.status(400).json({
                        message: 'Internal Server Error'
                      });
                    });

                  }).catch(error => {
                    console.log(error);
                    res.status(400).json({
                      message: 'Internal Server Error'
                    });
                  });
                }

                CustomerOrder.updateOne({
                  _id: req.body.order_id
                }, {
                  $set: {
                    order_status: 'cancelled by me',
                    reason_for_cancel: req.body.reason_for_cancel
                  }
                }).then(updated_order => {
                  res.status(200).json({
                    message: 'You cancelled the order.'
                  });
                }).catch(error => {
                  console.log(error);
                  res.status(400).json({
                    message: 'Internal Server Error'
                  });
                });

              } else {
                console.log('24h pahu wela nee');
                var no_of_selected_suppliers = searched_order.selected_supplier_ids.length;
                var no_of_attends_to_my_order = searched_order.no_of_attends_to_my_order;
                var precentage = (no_of_attends_to_my_order / no_of_selected_suppliers) * 100;

                if (precentage > 60) {
                  console.log('60%ta wedi');
                  for (var i = 0; i < searched_order.selected_supplier_ids.length; i++) {
                    // console.log(searched_order.selected_supplier_ids[i]);
                    Supplier.search_supplier({
                      _id: searched_order.selected_supplier_ids[i]
                    }).then(searched_supplier => {
                      // console.log(searched_supplier.normal_order_queue);
                      var normal_order_queue = searched_supplier.normal_order_queue;
                      var cancelling_order_id_by_us = searched_order.order_id_by_us;
                      // console.log(cancelling_order_id_by_us);
                      normal_order_queue.pop(cancelling_order_id_by_us);
                      // console.log(normal_order_queue);
                      Supplier.updateOne({
                        _id: searched_supplier._id
                      }, {
                        $set: {
                          normal_order_queue: normal_order_queue
                        }
                      }).then(updated_supplier => {
                        // console.log(updated_supplier);

                      }).catch(error => {
                        console.log(error);
                        res.status(400).json({
                          message: 'Internal Server Error'
                        });
                      });

                    }).catch(error => {
                      console.log(error);
                      res.status(400).json({
                        message: 'Internal Server Error'
                      });
                    });
                  }

                  CustomerOrder.updateOne({
                    _id: req.body.order_id
                  }, {
                    $set: {
                      order_status: 'cancelled by me',
                      reason_for_cancel: req.body.reason_for_cancel
                    }
                  }).then(updated_order => {
                    res.status(200).json({
                      message: 'You cancelled the order.'
                    });
                  }).catch(error => {
                    console.log(error);
                    res.status(400).json({
                      message: 'Internal Server Error'
                    });
                  });
                } else {
                  console.log('60%ta adui');
                  for (var i = 0; i < searched_order.selected_supplier_ids.length; i++) {
                    // console.log(searched_order.selected_supplier_ids[i]);
                    Supplier.search_supplier({
                      _id: searched_order.selected_supplier_ids[i]
                    }).then(searched_supplier => {
                      // console.log(searched_supplier.normal_order_queue);
                      var normal_order_queue = searched_supplier.normal_order_queue;
                      var cancelling_order_id_by_us = searched_order.order_id_by_us;
                      // console.log(cancelling_order_id_by_us);
                      normal_order_queue.pop(cancelling_order_id_by_us);
                      // console.log(normal_order_queue);
                      Supplier.updateOne({
                        _id: searched_supplier._id
                      }, {
                        $set: {
                          normal_order_queue: normal_order_queue
                        }
                      }).then(updated_supplier => {
                        // console.log(updated_supplier);

                      }).catch(error => {
                        console.log(error);
                        res.status(400).json({
                          message: 'Internal Server Error'
                        });
                      });

                    }).catch(error => {
                      console.log(error);
                      res.status(400).json({
                        message: 'Internal Server Error'
                      });
                    });
                  }

                  CustomerOrder.updateOne({
                    _id: req.body.order_id
                  }, {
                    $set: {
                      order_status: 'cancelled by me',
                      reason_for_cancel: req.body.reason_for_cancel
                    }
                  }).then(updated_order => {
                    // ban for 2 hours
                    CustomerOrder.findOne({
                      _id: req.body.order_id
                    }).then(order => {
                      var customer_id = order.customer_id;
                      Customer.search_customer({
                        _id: customer_id
                      }).then(customer => {
                        console.log(customer);
                        var banned_date = customer.banned_date;
                        var banned_time = customer.banned_time;
                        var banned_hours = customer.banned_hours;
                        var banned_date_time = banned_date + ' ' + banned_time;
                        var today_date_and_time = req.body.date + ' ' + req.body.time;
                        var diff = Math.abs(new Date(today_date_and_time) - new Date(banned_date_time));
                        var minutes = Math.floor((diff / 1000) / 60);
                        console.log("min" + minutes);

                        if (minutes > banned_hours * 60) {
                          console.log('denata ban nee');
                          var banned_hours = 2;
                          Customer.updateOne({
                            _id: customer_id
                          }, {
                            $set: {
                              banned_hours: banned_hours,
                              banned_date: req.body.date,
                              banned_time: req.body.time
                            }
                          }).then(customer2 => {
                            console.log(customer2.banned_hours);
                            res.status(200).json({
                              message: 'You cancelled the order.'
                            });
                          }).catch(error => {
                            console.log(error);
                            res.status(400).json({
                              message: 'Internal Server Error'
                            });
                          });

                        } else {
                          console.log('thawama ban ekaka inne');
                          var banned_hours = customer.banned_hours + 2;
                          Customer.updateOne({
                            _id: customer_id
                          }, {
                            $set: {
                              banned_hours: banned_hours
                            }
                          }).then(customer2 => {
                            console.log(customer2.banned_hours);
                            res.status(200).json({
                              message: 'You cancelled the order.'
                            });
                          }).catch(error => {
                            console.log(error);
                            res.status(400).json({
                              message: 'Internal Server Error'
                            });
                          });
                        }

                      }).catch(error => {
                        console.log(error);
                        res.status(400).json({
                          message: 'Internal Server Error'
                        });
                      });
                    }).catch(error => {
                      console.log(error);
                      res.status(400).json({
                        message: 'Internal Server Error'
                      });
                    });

                  }).catch(error => {
                    console.log(error);
                    res.status(400).json({
                      message: 'Internal Server Error'
                    });
                  });
                }
              }
            } else {
              console.log("already cancelled");
              res.status(200).json({
                message: 'Order already cancelled'
              });
            }
          }).catch(err=>{
            console.log(err);
            res.status(400).json({
              message: 'Internal Server Error'
            });
          });

          // const diffDays = Math.ceil(diffTime / (1000));
        }
      } else {
        res.status(200).json({
          message: 'You are waiting for reply from suppliers..You cant cancel order. please wait...'
        });
      }
    } else {
      res.status(200).json({
        message: 'There have unanswered estimations..You cant cancel order. please answer to estimations'
      });
    }
  }).catch(error => {
    console.log(error);
  });
}
