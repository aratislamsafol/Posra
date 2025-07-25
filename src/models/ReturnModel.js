const mongoose = require('mongoose');

const returnsSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  order_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  },
  reason: {
    type: String,
    required: [true, 'Return reason is required'],
    trim: true,
    maxlength: [1000, 'Reason cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true
  },
  processed_at: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

const ReturnsModel = mongoose.model('Return', returnsSchema);

module.exports = ReturnsModel;
