const mongoose = require('mongoose');
const encryption = require('./../../auth/encryption');
// auth/encryption.js

const Track_My_ID_Schema = mongoose.Schema({
  track_id: {
    type: String,
    required: true,
    unique: true
  },
  order_id: {
    type: String,
    required: true
  },
  estimation_id: {
    type: String,
    required: true
  },
  track_id_status: {
    type: String,
    required: true
  },
  created_date: {
    type: String,
    required: true
  },
  created_time: {
    type: String,
    required: true
  },
  supplier_id: {
    type: String,
    required: true
  },


  // Waiting for pickup by PO Name
  ready_for_pickup_supplier_id: {
    type: String,
    default: null
  },
  ready_for_pickup_po_id: {
    type: String,
    default: null
  },
  ready_for_pickup_date: {
    type: String,
    default: null
  },
  ready_for_pickup_time: {
    type: String,
    default: null
  },


  //processing at PO Name
  received_from_supplier_to_po_date: {
    type: String,
    default: null
  },
  received_from_supplier_to_po_time: {
    type: String,
    default: null
  },
  picked_list_id: {
    type: String,
    default: null
  },


  // In transmit to PO Name
  inter_po_transmit_queue: [{
    inter_po_dispatch_list_id: String,
    inter_po_transmit_date: String,
    inter_po_transmit_time: String,
    inter_po_transmit_first_po_id: String,
    inter_po_transmit_second_po_id: String,
    inter_po_transmit_incharge_officer_name: String,
    inter_po_transmit_incharge_officer_telephone: Number,
    inter_po_transmit_reason: String,
  }],


  //processing at PO Name
  received_from_po_to_po: [{
    received_from_po_to_po_date: String,
    received_from_po_to_po_time: String,
  }],


  // 2020/04/16 after 2pm arriving at your location
  final_delivery: [{
    final_delivery_dipatch_list_id: String,
    sheduled_dispatch_date_from_po: String,
    sheduled_dispatch_time_from_po: String,
  }],


  // delivery completed / delivery attempt failed
  delivery_feedback: [{
    delivery_feedback_added_date: String,
    delivery_feedback_added_time: String,
    delivery_feedback: String,
    delivery_incompleted_reason: String,
    cost_from_customer: String,
  }],


  // Conflict found in your delivery address
  new_track_id: [{
    new_track_id: String,
    new_track_id_added_date: String,
    new_track_id_added_time: String,
    new_track_id_added_officer: String,
  }],


  // returning to supplier
    returned_to_supplier_added_date: {
      type: String,
      default: null
    },
    returned_to_supplier_added_time: {
      type: String,
      default: null
    },
    returned_to_supplier_added_po: {
      type: String,
      default: null
    },


  // order cancelled
  order_cancelled_by_customer_date: {
    type: String,
    default: null
  },
  order_cancelled_by_customer_time: {
    type: String,
    default: null
  },
  order_cancelled_by_customer_reason: {
    type: String,
    default: null
  },
});


//
//
// Track_My_ID_Schema.pre('save', function(next) {
//   // console.log("pre is running");
//   var my_track_id = this;
//   if (!my_track_id.isModified('track_id')) {
//     return next();
//   }
//   encryption.encrypt(this.track_id).then((encrypted_track_id) => {
//     this.track_id = encrypted_track_id;
//     next();
//   }).catch(error => {
//     throw new Error(error);
//     next();
//   });
// });
//
// Track_My_ID_Schema.pre('save', function(next) {
//   // console.log("pre is running");
//   var my_track_id = this;
//   if (!my_track_id.isModified('order_id')) {
//     return next();
//   }
//   encryption.encrypt(this.order_id).then((encrypted_order_id) => {
//     this.order_id = encrypted_order_id;
//     next();
//   }).catch(error => {
//     throw new Error(error);
//     next();
//   });
// });
//
// Track_My_ID_Schema.pre('save', function(next) {
//   // console.log("pre is running");
//   var my_track_id = this;
//   if (!my_track_id.isModified('estimation_id')) {
//     return next();
//   }
//   encryption.encrypt(this.estimation_id).then((encrypted_estimation_id) => {
//     this.estimation_id = encrypted_estimation_id;
//     next();
//   }).catch(error => {
//     throw new Error(error);
//     next();
//   });
// });


module.exports = mongoose.model('Track_My_ID', Track_My_ID_Schema);
