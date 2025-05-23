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
