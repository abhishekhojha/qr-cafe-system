const MenuItem = require("../models/MenuItem");
const Ingredient = require("../models/Ingredient");

// Add a new menu item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, ingredients } = req.body;

    // Simple validation example (optional)
    if (!name || !price || !Array.isArray(ingredients)) {
      return res
        .status(400)
        .json({ error: "Name, price and ingredients are required" });
    }

    const menuItem = new MenuItem({ name, description, price, ingredients });
    await menuItem.save();

    res.status(201).json({ message: "Menu item created", menuItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all menu items with ingredient names populated
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().populate(
      "ingredients.ingredientId",
      "name unit"
    );
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
