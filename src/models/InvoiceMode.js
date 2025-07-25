
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoice_number: { type: String, required: true, unique: true },
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  paid_amount: { type: Number, default: 0 },
  due_amount: { type: Number, default: 0 },
  payment_method: { type: String, enum: ['cash', 'card', 'mobile', 'bank'], required: true },
  status: { type: String, enum: ['paid', 'partial', 'unpaid'], default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
