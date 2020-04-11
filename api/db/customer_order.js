const Customer_Order = require('./../model/customer_order');


exports.save = (cust_order) => {
  return new Promise((resolve, reject) => {
    Customer_Order.create(cust_order).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.search_patient = (driver_mail) => {
    return new Promise((resolve, reject) => {
        Driver_Entity.findOne(driver_mail).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};
