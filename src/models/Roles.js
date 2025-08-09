const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: {
      values: ['Admin', 'Customer', 'Staff', 'Supplier', 'Manager'],
      message: 'Role name must be one of Admin, Customer, Staff, Supplier'
    },
    required: [true, 'Role name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true,
  versionKey: false
});

const RoleModel = mongoose.model('Role', roleSchema);

module.exports = RoleModel;
