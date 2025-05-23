const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now }
});

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  unit: { type: String, enum: ['gm', 'ml', 'pcs'], required: true },
  stock: { type: Number, default: 0 },
  priceHistory: [priceHistorySchema]
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
