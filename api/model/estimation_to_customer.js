const mongoose = require('mongoose');

const Estimation_To_Customer_Schema = mongoose.Schema({
  supplier_id: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true
  },
  estimation_for_full_requirement: {
    type: Boolean,
    required: true,
    default: true
  },
  estimation_status: { //pending | accepted | declined | cancelled by supplier | cancelled by system | sold out
    type: String,
    default:'pending'
  },
  estimation_date: {
    type: String,
    default:null
  },
  estimation_time: {
    type: String,
    default:null
  },
  estimation_cancelled_reason: {
    type: String,
    default:null
  },
  estimation_sold_out_reason: { // order sold out by partial estimate 3 medications amount Rs.300
    type: String,
    default:null
  },
  total_net_amount: {
    type: Number,
    required: true
  },
  estimation_reply_by_customer: {
    type: String,
    default:null
  },
  wanted_days_as_prescription: {
    type: Number,
    required: true
  },
  available_items: [{
    item:String,
    wanted_days:Number,
    duration_i_can_supply:Number,
    dose:String,
    brand_name:String,
    price:Number
  }],
  cancelled_items:[{
    item:String,
    reason:String
  }],
  special_instruction: {
    type: String,
    default:null
  },
  invoice_num: {
    type: String,
    default:null
  },
  invoice_date: {
    type: String,
    default:null
  },
  invoice_time: {
    type: String,
    default:null
  }


});

module.exports = mongoose.model('Estimation To Customer', Estimation_To_Customer_Schema);
