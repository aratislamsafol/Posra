const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: {
    type: String,
    trim: true,
    minlength: [7, 'Phone number must be at least 7 digits'],
    maxlength: [20, 'Phone number cannot exceed 20 digits'],
    validate: {
      validator: function (v) {
        return /^[\d\+\-\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters']
    // Note: always hash password before save
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
  versionKey: false
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
