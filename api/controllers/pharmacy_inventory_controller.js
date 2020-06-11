const pharmacyProductCategory = require('./../db/pharmacy_product_category');
const pharmacyProductBrand = require('./../db/pharmacy_product_brand');


exports.addCategory = (req, res, next) => {
    pharmacyProductCategory.save(req.body).then(result => {
        console.log(saved);
        console.log(result);
    });
};

exports.updateCategory = (req, res, next) => {

};

exports.deleteCategory = (req, res, next) => {

};

exports.getAllCategories = (req, res, next) => {

};

exports.addBrand = (req, res, next) => {

};

exports.updateBrand = (req, res, next) => {

};

exports.deleteBrand = (req, res, next) => {

};

exports.getAllBrands = (req, res, next) => {

};