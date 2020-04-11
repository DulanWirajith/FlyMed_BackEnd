const mongoose = require('mongoose');

const Post_Office_Schema = mongoose.Schema({
  notified_batch_ids_queue: {
    type: String
    // only have track_ids
  },

});

module.exports = mongoose.model('Post Office', Post_Office_Schema);
