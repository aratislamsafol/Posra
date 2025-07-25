const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// To avoid duplicate wishlist items for same user and product
wishlistSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

module.exports = WishlistModel;
