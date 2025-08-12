const orderAddressSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  name: String,
  phone: String,
  address: String,
  city: String,
  postal_code: String,
  country: String
}, { versionKey: false });

module.exports = mongoose.model('OrderAddress', orderAddressSchema);
