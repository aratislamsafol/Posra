const mongoose = require('mongoose');

const userLoginMethodSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  method: {
    type: String,
    required: [true, 'Login method is required'],
    enum: ['password', 'google', 'facebook', 'twitter', 'github', 'other']
  },
  provider_id: {
    type: String,
    trim: true,
    default: '' 
  }
}, {
  timestamps: true,
  versionKey: false
});

const UserLoginMethodModel = mongoose.model('UserLoginMethod', userLoginMethodSchema);

module.exports = UserLoginMethodModel;
