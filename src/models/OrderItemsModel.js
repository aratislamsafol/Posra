const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  spec_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSpecs', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('OrderItem', orderItemSchema);
