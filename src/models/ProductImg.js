const mongoose = require('mongoose');

const productImagesSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
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

const ProductImagesModel = mongoose.model('ProductImages', productImagesSchema);

module.exports = ProductImagesModel;
