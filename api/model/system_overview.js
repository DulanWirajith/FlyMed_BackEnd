const mongoose = require('mongoose');

const System_Overview_Schema = mongoose.Schema({
  no_of_customers: {
    type: Number,
    default:0
  },
  no_of_suppliers: {
    type: Number,
    default:0
  },
  no_of_orders: {
    type: Number,
    default:0
  }
});

module.exports = mongoose.model('System Overview', System_Overview_Schema);
