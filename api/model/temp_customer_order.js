const mongoose = require('mongoose');

const Temp_Customer_Orders_Schema = mongoose.Schema({
  order_id: {
    type: String
  },
  supplier_id: {
    type: String
  },
  order_time: {
    type: String
  },
  expireAt: {
    type: Date,
    default: new Date()
  }
});


Temp_Customer_Orders_Schema.pre('deleteOne', function(next) {
  console.log("pre is running for deleteOne");
  var temp_cust_order = this;
  console.log(temp_cust_order);
  next();
});


Temp_Customer_Orders_Schema.pre('save', function(next) {
  console.log("pre is running");
  var temp_cust_order = this;
  console.log('pre on      ' + temp_cust_order + '      pre off');
  next();
});



module.exports = mongoose.model('temp_customer_order', Temp_Customer_Orders_Schema);
