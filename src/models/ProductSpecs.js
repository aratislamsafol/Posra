const mongoose = require('mongoose');

const productSpecsSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: String, trim: true },
  color: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  specification_field: { type: String, trim: true, maxlength: 100 },
  values: { type: [String], default: [] },
  description: { type: String, trim: true, maxlength: 1000 },
  unit: { type: String, trim: true, maxlength: 50 },
  is_optional: { type: Boolean, default: false }

}, { timestamps: true, versionKey: false });

const ProductSpecsModel = mongoose.model('ProductSpecs', productSpecsSchema);
module.exports = ProductSpecsModel;
