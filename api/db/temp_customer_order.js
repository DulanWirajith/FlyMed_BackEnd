const Temp_Customer_Order = require('./../model/temp_customer_order');


exports.saveorder = (query) => {
  return new Promise((resolve, reject) => {
    Temp_Customer_Order.create(query).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};


exports.remove = (query) => {
  return new Promise((resolve, reject) => {
    Temp_Customer_Order.deleteOne(query).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};
