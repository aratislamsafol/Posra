const mongoose = require('mongoose');

const supplierPaymentSchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Supplier ID is required']
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  method: {
    type: String,
    required: [true, 'Payment method is required'],
    trim: true,
    enum: ['cash', 'bank_transfer', 'cheque', 'mobile_payment', 'other']
  },
  transaction_ref: {
    type: String,
    trim: true,
    default: ''
  },
  paid_at: {
    type: Date,
    required: [true, 'Payment date is required']
  }
}, {
  timestamps: true,
  versionKey: false
});

const SupplierPaymentModel = mongoose.model('SupplierPayment', supplierPaymentSchema);

module.exports = SupplierPaymentModel;
