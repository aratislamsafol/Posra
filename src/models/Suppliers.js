const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        // simple email regex
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true,
    minlength: [7, 'Phone number must be at least 7 digits'],
    maxlength: [20, 'Phone number cannot exceed 20 digits'],
    validate: {
      validator: function(v) {
        // simple phone regex for digits, +, -, spaces
        return /^[\d\+\-\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  balance: {
    type: Number,
    default: 0,
    min: [0, 'Balance cannot be negative']
  }
}, {
  timestamps: true,
  versionKey: false
});

const SupplierModel = mongoose.model('Supplier', supplierSchema);

module.exports = SupplierModel;
