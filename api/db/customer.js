const Customer = require('./../model/customer');


exports.save = (customer) => {
  return new Promise((resolve, reject) => {
    Customer.create(customer).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.search_customer = (query) => {
  return new Promise((resolve, reject) => {
    Customer.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Customer.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};
