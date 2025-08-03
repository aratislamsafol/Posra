const mongoose = require('mongoose');

const productImagesSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    unique: true,
    required: true
  },
  image_urls: {
    type: [String], 
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 5 && v.length <= 8;
      },
      message: 'Image URLs must be between 5 and 8 items'
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

const ProductImagesModel = mongoose.model('productimages', productImagesSchema);

module.exports = ProductImagesModel;
