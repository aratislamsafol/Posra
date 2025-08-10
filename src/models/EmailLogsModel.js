const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'EmailTemplate',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipient_email: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['sent', 'failed'],
    required: true
  },
  error_message: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

const EmailLogModel = mongoose.model('EmailLog', emailLogSchema);

module.exports = EmailLogModel;
