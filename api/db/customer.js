const Customer = require('./../model/customer');


exports.save = (customer) => {
  return new Promise((resolve, reject) => {
    Customer.create(patient).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};
