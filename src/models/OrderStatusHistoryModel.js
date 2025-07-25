const mongoose = require('mongoose');

const orderStatusHistorySchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      required: true,
    },
    changed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true,  versionKey: false } 
);

module.exports = mongoose.model('OrderStatusHistory', orderStatusHistorySchema);
