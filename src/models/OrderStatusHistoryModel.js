const orderStatusHistorySchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  status: { type: String, required: true },
  changed_at: { type: Date, default: Date.now },
  note: String
}, { versionKey: false });

module.exports = mongoose.model('OrderStatusHistory', orderStatusHistorySchema);
