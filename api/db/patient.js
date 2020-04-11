const Patient = require('./../model/patient');


exports.save = (patient) => {
  return new Promise((resolve, reject) => {
    Patient.create(patient).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    })
  });
};
