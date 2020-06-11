const mongoose = require("mongoose");

const Murapada_Entity = mongoose.Schema({
    user: { type: String },
    password: { type: String }
});

module.exports = mongoose.model('Murapada', Murapada_Entity);