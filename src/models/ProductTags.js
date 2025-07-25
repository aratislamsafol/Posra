const mongoose = require('mongoose');

const productTagSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  tag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Composite Unique Index to avoid duplicate product-tag pairs
productTagSchema.index({ product_id: 1, tag_id: 1 }, { unique: true });

const ProductTagModel = mongoose.model('ProductTag', productTagSchema);

module.exports = ProductTagModel;
