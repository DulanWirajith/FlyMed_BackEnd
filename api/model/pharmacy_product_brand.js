const mongoose = require('mongoose');

const Pharmacy_Product_Brand_Schema = mongoose.Schema({
    brand: { type: String },
    weight: { type: String },
    price: { type: String },
    sales: { type: Number },
    product_category: { type: String },
    pharmacy: { type: String }
});

module.exports = mongoose.model('Pharmacy_Product_Brand', Pharmacy_Product_Brand_Schema);