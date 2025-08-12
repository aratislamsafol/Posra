const couponUsageSchema = new mongoose.Schema({
  coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  used_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('CouponUsage', couponUsageSchema);
