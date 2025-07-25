const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'login', 'logout', 'other'], 
    default: 'other'
  },
  entity: {
    type: String,
    required: true,
    trim: true
  },
  entity_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed, 
    default: {}
  }
}, {
  timestamps: true,
  versionKey: false
});

const AuditLogModel = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLogModel;
