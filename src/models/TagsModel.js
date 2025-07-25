const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Tag name must be at least 2 characters'],
    maxlength: [50, 'Tag name cannot exceed 50 characters']
  }
}, {
  timestamps: true,
  versionKey: false
});

const TagModel = mongoose.model('Tag', tagSchema);

module.exports = TagModel;
