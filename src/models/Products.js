const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    minlength: [3, 'SKU must be at least 3 characters'],
    maxlength: [30, 'SKU cannot exceed 30 characters']
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    minlength: [5, 'Barcode must be at least 5 characters'],
    maxlength: [50, 'Barcode cannot exceed 50 characters']
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: [true, 'Brand is required']
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    default: '',
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  main_image: {
    type: String,
    default: '',
    validate: {
      validator: function(v) {
        if(!v) return true; 
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL`
    }
  },
  
  status: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: 'Status must be either active or inactive'
    },
    default: 'active'
  }
}, {
  timestamps: true,
  versionKey: false
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
