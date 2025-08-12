const mongoose = require('mongoose');

const paymentLogSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  gateway: { type: String, required: true }, 
  transaction_id: { type: String },
  attempt_no: { type: Number, default: 1 },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'BDT' },
  status: { type: String, enum: ['Pending', 'Success', 'Failed', 'Cancelled'], required: true },
  response_data: { type: Object },
  created_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('PaymentLog', paymentLogSchema);
