const Estimation_To_Customer = require('./../model/estimation_to_customer');


exports.save = (estimation) => {
  return new Promise((resolve, reject) => {
    Estimation_To_Customer.create(estimation).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    Estimation_To_Customer.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Estimation_To_Customer.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};
