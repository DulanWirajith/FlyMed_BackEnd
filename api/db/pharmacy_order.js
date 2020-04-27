const Pharmacy_Order = require('./../model/pharmacy_order');


exports.save = (cust_order) => {
  return new Promise((resolve, reject) => {
    Pharmacy_Order.create(cust_order).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.findAll = (query) => {
  return new Promise((resolve, reject) => {
    Pharmacy_Order.find(query).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Pharmacy_Order.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};

exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    Pharmacy_Order.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};
