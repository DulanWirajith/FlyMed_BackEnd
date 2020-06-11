const mongoose = require('mongoose');

const Pharmacy_Schema = mongoose.Schema({
  pharmacy_name: {
    type: String
  },

  notification_to_me: [{
    title: String,
    description: String,
    viewed: {
      type: Boolean,
      default: false
    }
  }],

  normal_order_queue: [], // all notifying order_ids

  confirmed_order_queue: [], // only have track_ids |  status => default false

  customer_requested_new_estimation_queue: [], // estimation ekaka change request kiyala ena ewa

  order_confirmed_with_customer_request_queue: [], // estimation ekaka change request kiyala ena ewa. only have track_ids

  processing_order_queue_one: [], // track_ids | status => default false

  my_disputes_queue: [], // dispute_track_id | status => default false

  // processing_order_queue_two: [], // track_ids | status => default false

  // printig_dispatch_note_queue: [],

  // confirmed_order_cancelling_requests_by_customer_queue: [] //track_id | reason | estimation_id | is_cancelled | date | time
});


module.exports = mongoose.model('Pharmacy', Pharmacy_Schema);
