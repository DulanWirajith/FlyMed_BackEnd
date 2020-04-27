const Pharmacy = require('./../db/pharmacy');
const Response = require('./../../config/Response');

exports.register = (req, res, next) => {
  Pharmacy.save(req.body).then(savedSupplier => {
    Response.create(res, 200, 'saved', savedSupplier);
  }).catch(err => {
    console.log(err);
    Response.create(res, 500, 'server error', err);
  })
};

exports.requestedConfirmedOrderCancel=(req,res,next)=>{

};
