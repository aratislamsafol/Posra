const mongoose = require('mongoose');
const orderPaymentSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  method: { type: String, enum: ['Cash', 'Card', 'Mobile Banking'], required: true },
  transaction_id: String,
  amount: Number,
  payment_date: Date,
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
}, { versionKey: false });

module.exports = mongoose.model('OrderPayment', orderPaymentSchema);
