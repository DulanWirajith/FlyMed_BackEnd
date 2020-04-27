const Dispute = require('./../model/dispute');


exports.save = (query) => {
  return new Promise((resolve, reject) => {
    Dispute.create(query).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.findAll = (query) => {
  return new Promise((resolve, reject) => {
    Dispute.find(query).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Dispute.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};

exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    Dispute.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};
