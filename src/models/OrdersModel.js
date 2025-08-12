const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_number: { type: String, unique: true, required: true },
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  shipping_cost: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grand_total: { type: Number, required: true },
  payment_status: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
  order_status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  created_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
