const Track_My_ID = require('./../model/track_my_id');


exports.save = (query) => {
  return new Promise((resolve, reject) => {
    Track_My_ID.create(query).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};

exports.findAll = (query) => {
  return new Promise((resolve, reject) => {
    Track_My_ID.find(query).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};

exports.updateOne = (query1, query2) => {
  return new Promise((resolve, reject) => {
    Track_My_ID.findOneAndUpdate(query1, query2).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    });
  });
};

exports.findOne = (query) => {
  return new Promise((resolve, reject) => {
    Track_My_ID.findOne(query).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
};
