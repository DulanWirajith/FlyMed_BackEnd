const mongoose = require('mongoose');

const Thahawuru_Kireem_Entity = mongoose.Schema({
    kawada: { type: String },
    kethaya: { type: String },
    karada: { type: Boolean },
    yawu_dinaya: { type: Date },
    thahawuru_kala_dinaya:{type:Date}
});

module.exports = mongoose.model('Thahawuru_Kireem', Thahawuru_Kireem_Entity);