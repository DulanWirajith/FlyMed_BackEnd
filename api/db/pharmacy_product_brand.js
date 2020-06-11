const pharmacyProductBrand = require('./../model/pharmacy_product_brand');


exports.save = (obj) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.create(obj).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findOne = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.findOne(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findAll = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.find(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};


exports.updateOne = (search_query,update_query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.updateOne(search_query,update_query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.updateAll = (search_query,update_query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.updateMany(search_query,update_query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};


exports.deleteOne = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.deleteOne(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findAndDelete = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductBrand.findOneAndDelete(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};