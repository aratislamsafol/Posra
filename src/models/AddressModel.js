const mongoose = require('mongoose');
const orderAddressSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  name: String,
  phone: String,
  address_line1: String,
  address_line2: String,
  state: String,
  city: String,
  postal_code: String,
  country: String
}, { versionKey: false });

module.exports = mongoose.model('OrderAddress', orderAddressSchema);
