const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'ordered', 'cancelled'], 
    default: 'active',
    required: true
  }
}, {
  timestamps: true, 
  versionKey: false
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
