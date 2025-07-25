const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['fixed', 'percent'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  min_purchase: {
    type: Number,
    required: true,
    min: 0
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const CouponModel = mongoose.model('Coupon', couponSchema);

module.exports = CouponModel;
