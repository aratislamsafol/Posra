const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'warning', 'success', 'error', 'promo', 'system'], 
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  read_at: {
    type: Date, 
    default: null
  }
}, {
  timestamps: true, 
  versionKey: false
});

const NotificationModel = mongoose.model('Notification', notificationSchema);

module.exports = NotificationModel;
