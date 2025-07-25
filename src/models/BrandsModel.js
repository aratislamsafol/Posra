const mongoose = require('mongoose');
const slugify = require('slugify');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  logo_url: {
    type: String,
    default: ''
  },
  brand_url: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Pre-save hook to generate slug for brand_url from name
brandSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.brand_url = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const BrandModel = mongoose.model('Brand', brandSchema);

module.exports = BrandModel;
