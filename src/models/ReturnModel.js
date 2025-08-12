const orderReturnSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  reason: String,
  status: { type: String, enum: ['Requested', 'Approved', 'Rejected', 'Refunded'], default: 'Requested' },
  request_date: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('OrderReturn', orderReturnSchema);
