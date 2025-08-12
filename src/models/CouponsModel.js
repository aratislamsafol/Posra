const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount_type: { type: String, enum: ['percentage', 'fixed'], required: true },
  discount_value: { type: Number, required: true },
  min_purchase: { type: Number, default: 0 },
  start_date: Date,
  end_date: Date,
  usage_limit: Number
}, { versionKey: false });

module.exports = mongoose.model('Coupon', couponSchema);
