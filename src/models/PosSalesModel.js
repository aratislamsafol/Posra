const mongoose = require('mongoose');

const posSaleSchema = new mongoose.Schema({
  pos_session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PosSession',
    required: true
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  type: {
    type: String,
    enum: ['sale', 'return', 'exchange'], 
    default: 'sale',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const PosSaleModel = mongoose.model('PosSale', posSaleSchema);

module.exports = PosSaleModel;
