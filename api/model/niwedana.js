const mongoose = require('mongoose');

const Niwedana_Schema = mongoose.Schema({
    mathrukawa: { type: String },
    wistharaya: { type: String },
    mkkda: { type: String }//order id|
});

module.exports = mongoose.model('Niwedana', Niwedana_Schema); 