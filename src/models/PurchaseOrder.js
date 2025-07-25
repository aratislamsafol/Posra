const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'received', 'cancelled'],
    default: 'pending',
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true,
  versionKey: false
});

const PurchaseOrderModel = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrderModel;
