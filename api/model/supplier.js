const mongoose = require('mongoose');

const Supplier_Schema = mongoose.Schema({
  supplier_name: {
    type: String
  },

  normal_order_queue: [],// all notifying order_ids

  customer_requested_new_estimation_queue: [],// estimation ekaka change request kiyala ena ewa

  confirmed_order_queue: [],// only have track_ids

  order_confirmed_with_customer_request_queue: [],// estimation ekaka change request kiyala ena ewa. only have track_ids

  processing_order_queue_one: [], // track_ids | status => default false

  processing_order_queue_two: [], // track_ids | status => default false

  printig_dispatch_note_queue: [],

  confirmed_order_cancelling_requests_by_customer_queue:[] //track_id | reason | estimation_id | is_cancelled | date | time
});

module.exports = mongoose.model('Supplier', Supplier_Schema);
