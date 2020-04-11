const Supplier = require('./../model/supplier');


exports.save = (supplier) => {
  return new Promise((resolve, reject) => {
    Supplier.create(supplier).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.search_supplier = (query) => {
  return new Promise((resolve, reject) => {
    Supplier.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Supplier.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};
