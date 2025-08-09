const mongoose = require('mongoose');

const userOTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300  
  }
},
{
  versionKey: false
});

const UserOTPModel = mongoose.model('UserOTP', userOTPSchema);
module.exports = UserOTPModel;
