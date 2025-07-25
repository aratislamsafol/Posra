const mongoose = require('mongoose');

const productSpecsSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  specification_field: {
    type: String,
    required: [true, 'Specification field is required'],
    trim: true,
    maxlength: [100, 'Specification field cannot exceed 100 characters']
  },
  value: {
    type: String,
    required: [true, 'Specification value is required'],
    trim: true,
    maxlength: [500, 'Specification value cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  versionKey: false
});

const ProductSpecsModel = mongoose.model('ProductSpecs', productSpecsSchema);

module.exports = ProductSpecsModel;
