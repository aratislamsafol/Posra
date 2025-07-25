const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceProductSchema = new Schema({
  invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  total_price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('InvoiceProduct', invoiceProductSchema);
