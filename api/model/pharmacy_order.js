const mongoose = require('mongoose');
const encryption = require('./../../auth/encryption');
// auth/encryption.js

const Pharmacy_Order_Schema = mongoose.Schema({
  customer_id: {
    type: String,
    required: true
  },
  patient_name: {
    type: String,
    required: true
  },
  patient_title: {
    type: String,
    required: true
  },
  order_date: {
    type: String,
    required: true
  },
  order_time: {
    type: String,
    required: true
  },
  // deliver_to_my_address: {
  //   type: Boolean,
  //   default: true,
  //   required: true
  // },
  // delivery_address: {
  //   type: String,
  //   required: true
  // },
  // delivery_postal_code: {
  //   type: Number,
  //   required: true
  // },
  secondary_contact_num: {
    type: String
  },
  prescription_url: {
    type: String,
    required: true,
  },
  patient_nic_num: {
    type: String,
    required: true
  },
  // get_medicine_from_spc: {
  //   type: Boolean,
  //   default: false,
  //   required: true
  // },
  patient_nic_url: {
    type: String
  },
  // searching_postal_codes: {
  //   type: String,
  //   required: true
  // },
  selected_supplier_ids: [],
  no_of_medications: {
    type: Number,
    required: true
  },
  medication_summary: [],
  order_status: {
    type: String,
    default: 'pending',
    required: true
  },
  order_invoice_amount: {
    type: Number,
    default: 0,
    required: true
  },
  no_of_attends_to_my_order: {
    type: Number,
    default: 0,
    required: true
  },
  // is_senior_citizen: {
  //   type: Boolean,
  //   default: false,
  //   required: true
  // },
  order_id_by_us: {
    type: String,
    default:null
  },

  // After Model create

  confirmed_estimation_id: {
    type: String,
    default:null
  },
  order_confirmed_supplier_id: {
    type: String,
    default:null
  },
  my_track_id: {
    type: String,
    default:null
  },
  // changed_track_id: {
  //   type: String,
  //   default:null
  // },
  reason_for_cancel: {
    type: String,
    default:null
  },
  estimation_nums_to_order: [],
  unanswered_estimation_nums_to_order: [],
  waiting_another_response_for_estimation: [], //estimation ekak ewith. eka decline nokara mokakhari response ekak yawala thiyenawa
  already_request_confirm_order_cancelleration:{
    type: Boolean,
    default: false
  },
  order_declined_suppliers: [],
  order_viewed_suppliers:[]
  // order_invoice_id: {
  //   type: String
  // },

});




Pharmacy_Order_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var cust_order = this;
  if (!cust_order.isModified('prescription_url')) {
    return next();
  }
  encryption.encrypt(this.prescription_url).then((encrypted_prescription_url) => {
    this.prescription_url = encrypted_prescription_url;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

Pharmacy_Order_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var cust_order = this;
  if (!cust_order.isModified('patient_nic_num')) {
    return next();
  }
  encryption.encrypt(this.patient_nic_num).then((encrypted_patient_nic_num) => {
    this.patient_nic_num = encrypted_patient_nic_num;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

Pharmacy_Order_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var cust_order = this;
  if (!cust_order.isModified('patient_nic_url')) {
    return next();
  }
  encryption.encrypt(this.patient_nic_url).then((encrypted_patient_nic_url) => {
    this.patient_nic_url = encrypted_patient_nic_url;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});


module.exports = mongoose.model('Pharmacy_Order', Pharmacy_Order_Schema);
