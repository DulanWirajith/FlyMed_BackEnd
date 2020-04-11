const mongoose = require('mongoose');

const Customer_Order_Schema = mongoose.Schema({
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
  deliver_to_my_address: {
    type: Boolean,
    default: true,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  delivery_postal_code: {
    type: Number,
    required: true
  },
  secondary_contact_num: {
    type: String
  },
  prescription_url: {
    type: String,
    required: true
  },
  patient_nic_num: {
    type: String,
    required: true
  },
  get_medicine_from_spc: {
    type: Boolean,
    default: false,
    required: true
  },
  patient_nic_url: {
    type: String
  },
  searching_postal_codes: {
    type: String,
    required: true
  },
  selected_supplier_ids: {
    type: String,
    required: true
  },
  no_of_medications: {
    type: String,
    required: true
  },
  medication_summary: {
    type: String,
    required: true
  },
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
  is_senior_citizen: {
    type: Boolean,
    default: false,
    required: true
  },
  order_id_by_us: {
    type: String,
    required: true
  },

// After Model create

  confirmed_estimation_id: {
    type: String
  },
  order_confirmed_supplier_id: {
    type: String
  },
  my_track_id: {
    type: String
  },
  changed_track_id: {
    type: String
  },
  reason_for_cancel: {
    type: String
  },
  // order_invoice_id: {
  //   type: String
  // },

});

module.exports = mongoose.model('Customer_Order', Customer_Order_Schema);
