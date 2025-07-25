const mongoose = require('mongoose');

const posSessionSchema = new mongoose.Schema({
  staff_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',        
    required: true
  },
  open_time: {
    type: Date,
    required: true,
    default: Date.now     
  },
  close_time: {
    type: Date,
    default: null        
  },
  opening_balance: {
    type: Number,
    required: true,
    min: 0
  },
  closing_balance: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,      
  versionKey: false
});

const PosSessionModel = mongoose.model('PosSession', posSessionSchema);

module.exports = PosSessionModel;
