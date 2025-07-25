const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  method: {
    type: String,
    enum: ['cash_on_delivery', 'credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
    required: true
  },
  transaction_ref: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  paid_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
