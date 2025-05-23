const express = require('express');
const router = express.Router();
const {
  addIngredient,
  getIngredients,
  addStock
} = require('../controllers/ingredientController');

router.post('/add', addIngredient);
router.get('/', getIngredients);
router.put("/:id/add-stock", addStock);

module.exports = router;
