const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  warehouse_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  quantity_available: {
    type: Number,
    default: 0,
    min: 0
  },
  quantity_reserved: {
    type: Number,
    default: 0,
    min: 0
  },
  low_stock_threshold: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true,
  versionKey: false
});

// Composite unique index (product_id + warehouse_id)
inventorySchema.index({ product_id: 1, warehouse_id: 1 }, { unique: true });

const InventoryModel = mongoose.model('Inventory', inventorySchema);

module.exports = InventoryModel;
