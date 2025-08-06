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
  size: {
    type: [String],    
    default: undefined
  },
  value: {
    type: String,
    required: [true, 'Specification value is required'],
    trim: true,
    maxlength: [500, 'Specification value cannot exceed 500 characters']
  },
  
  unit: {                  
    type: String,
    trim: true,
    maxlength: [50, 'Unit cannot exceed 50 characters'],
    default: null
  },

  values: {                
    type: [String],
    default: undefined
  },

  description: {          
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: null
  },

  is_optional: {          
    type: Boolean,
    default: false
  },

}, {
  timestamps: true,
  versionKey: false
});


const ProductSpecsModel = mongoose.model('ProductSpecs', productSpecsSchema);

module.exports = ProductSpecsModel;
