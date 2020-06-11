const pharmacyProductCategory = require('./../model/pharmacy_product_category');


exports.save = (obj) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.create(obj).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findOne = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.findOne(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findAll = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.find(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};


exports.updateOne = (search_query, update_query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.updateOne(search_query, update_query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.updateAll = (search_query, update_query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.updateMany(search_query, update_query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};


exports.deleteOne = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.deleteOne(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};

exports.findAndDelete = (query) => {
    return new Promise((resolve, reject) => {
        pharmacyProductCategory.findOneAndDelete(query).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
};


let deleteOps = {
    $match: {
        operationType: "delete"
    }
};
pharmacyProductCategory.watch([deleteOps]).on('change', data => {
    console.log('delete');
    console.log(new Date(), data.documentKey);
    pharmacyProductCategory.findById(data.documentKey, function (err, item) {
        console.log(item);
    });
});
