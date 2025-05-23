const Ingredient = require('../models/Ingredient');

// Add new ingredient or stock to existing one
exports.addIngredient = async (req, res) => {
  try {
    const { name, unit, quantity, pricePerUnit } = req.body;

    let ingredient = await Ingredient.findOne({ name });

    if (!ingredient) {
      // Create new ingredient
      ingredient = new Ingredient({
        name,
        unit,
        stock: quantity,
        priceHistory: [{ quantity, pricePerUnit }]
      });
    } else {
      // Update existing ingredient
      ingredient.stock += quantity;
      ingredient.priceHistory.push({ quantity, pricePerUnit });
    }

    await ingredient.save();
    res.status(200).json({ message: 'Ingredient saved', ingredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all ingredients
exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { quantity, pricePerUnit } = req.body;
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) return res.status(404).json({ error: "Ingredient not found" });

    ingredient.stock += quantity;
    ingredient.priceHistory.push({
      quantity,
      pricePerUnit,
      addedAt: new Date()
    });

    await ingredient.save();
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};