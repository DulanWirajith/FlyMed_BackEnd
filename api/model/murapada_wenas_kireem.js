const mongoose = require('mongoose');

const Murapada_Wenas_Kireem = mongoose.Schema({
    parisheelaka: { type: String },
    kethaya: { type: String },
    thahawuruda: { type: Boolean, default: false }
});

module.exports = mongoose.model('Murapada_Wenas_Kireem', Murapada_Wenas_Kireem);