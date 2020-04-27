const Pharmacy = require('./../model/pharmacy');


exports.save = (supplier) => {
  return new Promise((resolve, reject) => {
    Pharmacy.create(supplier).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.search_supplier = (query) => {
  return new Promise((resolve, reject) => {
    Pharmacy.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Pharmacy.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};
