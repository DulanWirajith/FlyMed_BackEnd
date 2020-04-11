const mongoose = require('mongoose');

const Customer_Schema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  nic: {
    type: String
  },
  password: {
    type: String
  },
  on_going_orders:{
    type: Number
  }
});

module.exports = mongoose.model('Customer', Customer_Schema);
