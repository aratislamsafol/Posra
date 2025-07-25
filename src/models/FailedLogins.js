const mongoose = require('mongoose');

const failedLoginSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  attempt_time: {
    type: Date,
    default: Date.now
  },
  ip_address: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const FailedLoginModel = mongoose.model('FailedLogin', failedLoginSchema);

module.exports = FailedLoginModel;
