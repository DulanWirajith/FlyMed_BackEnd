const mongoose = require('mongoose');

const Pharmacy_Product_Category_Schema = mongoose.Schema({
    category: { type: String },
    sub_category: { type: String },
    product_name: { type: String },
    description: { type: String },
    urls: []
});

Pharmacy_Product_Category_Schema.index({createdAt: 1}, {expireAfterSeconds: 90});

module.exports = mongoose.model('Pharmacy_Product_Category', Pharmacy_Product_Category_Schema);