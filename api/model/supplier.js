const mongoose = require('mongoose');

const Supplier_Schema = mongoose.Schema({
  supplier_name: {
    type: String
  },

  confirmed_order_queue: [],// only have track_ids

  normal_order_queue: [],// all notifying order_ids

  processing_order_queue_one: [], // track_ids | status => default false

  processing_order_queue_two: [], // track_ids | status => default false

  printig_dispatch_note_queue: [],
});

module.exports = mongoose.model('Supplier', Supplier_Schema);
