const mongoose = require('mongoose');

const Supplier_Schema = mongoose.Schema({
  confirmed_order_queue: {
    type: String
    // only have track_ids
  },
  normal_order_queue: {
    type: String
    // all notifying order_ids
  },
  processing_order_queue_one: {
    type: String
    // track_ids | status => default false
  },
  processing_order_queue_two: {
    type: String
    // track_ids | status => default false
  },
  printig_dispatch_note_queue: {
    type: String
  },
});

module.exports = mongoose.model('Supplier', Supplier_Schema);
