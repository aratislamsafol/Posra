const mongoose = require('mongoose');

const paymentLogSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  data_json: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'fail', 'cancel'],
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const PaymentLogModel = mongoose.model('PaymentLog', paymentLogSchema);

module.exports = PaymentLogModel;
