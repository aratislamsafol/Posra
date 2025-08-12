const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      spec_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSpecs',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Cart', cartSchema);
