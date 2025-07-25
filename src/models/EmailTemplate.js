const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  body_html: {
    type: String, 
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const EmailTemplateModel = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplateModel;
