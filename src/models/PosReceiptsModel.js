const mongoose = require('mongoose');

const posReceiptSchema = new mongoose.Schema({
  pos_sale_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PosSale',  
    required: true
  },
  print_time: {
    type: Date,
    default: Date.now
  },
  receipt_url: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const PosReceiptModel = mongoose.model('PosReceipt', posReceiptSchema);

module.exports = PosReceiptModel;
