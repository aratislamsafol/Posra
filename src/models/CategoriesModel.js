const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  categories_url: {
    type: String,
    unique: true
  },
  image_url: {
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

categorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.categories_url = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
