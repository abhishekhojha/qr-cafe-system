const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  ingredients: [
    {
      ingredientId: mongoose.Schema.Types.ObjectId,
      quantityRequired: Number,
    },
  ],
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
