const Ingredient = require('../models/Ingredient');
const MenuItem = require('../models/MenuItem');

async function deductInventoryFIFO(orderItems) {
  for (const itemId of orderItems) {
    const menuItem = await MenuItem.findById(itemId).populate('ingredients.ingredientId');

    for (const ing of menuItem.ingredients) {
      const ingredient = await Ingredient.findById(ing.ingredientId._id);
      let qtyNeeded = ing.quantityRequired;

      // FIFO on priceHistory
      const history = [...ingredient.priceHistory].sort((a, b) =>
        new Date(a.addedAt) - new Date(b.addedAt)
      );

      for (let i = 0; i < history.length && qtyNeeded > 0; i++) {
        const batch = history[i];

        if (batch.quantity <= 0) continue;

        const used = Math.min(batch.quantity, qtyNeeded);
        batch.quantity -= used;
        qtyNeeded -= used;
      }

      if (qtyNeeded > 0) {
        throw new Error(`Insufficient stock for ${ingredient.name}`);
      }

      ingredient.priceHistory = history;
      ingredient.stock = history.reduce((sum, b) => sum + b.quantity, 0);
      await ingredient.save();
    }
  }
}

module.exports = { deductInventoryFIFO };
