const mongoose = require('mongoose');

const Dispute_Schema = mongoose.Schema({
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
  supplier_id: {
    type: String,
    required: true
  },


  dispute_track_id: {
    type: String,
    required: true
  },
  dispute_track_id_added_date: {
    type: String,
    required: true
  },
  dispute_track_id_added_time: {
    type: String,
    required: true
  },
  dispute_added_officer_id: {
    type: String,
    required: true
  },
  dispute_added_reason: {
    type: String,
    required: true
  },
  dispute_delivery_feedback_added_date: {
    type: String,
    default: null
  },
  dispute_delivery_feedback_added_time: {
    type: String,
    default: null
  },
  dispute_delivery_feedback: {
    type: String,
    default: null
  },
  dispute_delivery_incompleted_reason: {
    type: String,
    default: null
  },
  dispute_delivery_cost_from_supplier: {
    type: Number,
    default: null
  },
});


Dispute_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var dispute_id = this;
  if (!dispute_id.isModified('track_id')) {
    return next();
  }
  encryption.encrypt(this.track_id).then((encrypted_track_id) => {
    this.track_id = encrypted_track_id;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

Dispute_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var dispute_id = this;
  if (!dispute_id.isModified('order_id')) {
    return next();
  }
  encryption.encrypt(this.order_id).then((encrypted_order_id) => {
    this.order_id = encrypted_order_id;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

Dispute_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var dispute_id = this;
  if (!dispute_id.isModified('estimation_id')) {
    return next();
  }
  encryption.encrypt(this.estimation_id).then((encrypted_estimation_id) => {
    this.estimation_id = encrypted_estimation_id;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

Dispute_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var dispute_id = this;
  if (!dispute_id.isModified('dispute_track_id')) {
    return next();
  }
  encryption.encrypt(this.dispute_track_id).then((encrypted_dispute_track_id) => {
    this.estimation_id = encrypted_dispute_track_id;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

Dispute_Schema.pre('save', function(next) {
  // console.log("pre is running");
  var dispute_id = this;
  if (!dispute_id.isModified('dispute_added_officer_id')) {
    return next();
  }
  encryption.encrypt(this.dispute_added_officer_id).then((encrypted_dispute_added_officer_id) => {
    this.estimation_id = encrypted_dispute_added_officer_id;
    next();
  }).catch(error => {
    throw new Error(error);
    next();
  });
});

module.exports = mongoose.model('Dispute', Dispute_Schema);
