const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  type: {
    type: String,
    enum: ['home', 'office', 'billing', 'shipping', 'other'],
    default: 'home',
    required: true
  },
  address_line1: {
    type: String,
    required: true,
    trim: true
  },
  address_line2: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[\d+\-() ]{7,20}$/  
  }
}, {
  timestamps: true,
  versionKey: false
});

const AddressModel = mongoose.model('Address', addressSchema);

module.exports = AddressModel;
