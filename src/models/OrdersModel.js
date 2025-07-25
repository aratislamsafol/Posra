const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  shipping_cost: {
    type: Number,
    default: 0,
    min: 0
  },
  payment_status: {
    type: String,
    enum: ['unpaid', 'paid', 'failed', 'refunded'],
    default: 'unpaid'
  },
  payment_method: {
    type: String,
    enum: ['cash_on_delivery', 'credit_card', 'debit_card', 'bank_transfer'],
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
