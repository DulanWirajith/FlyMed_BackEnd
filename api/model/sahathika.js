const mongoose = require('mongoose');

const Sahathika_Entity = mongoose.Schema({
    mkkda: { type: String },
    kre_kwda: { type: String },
    aminum: [],
    dinaya: { type: Date },
    wenas_kireem: []
});

module.exports = mongoose.model('Sahathika', Sahathika_Entity);