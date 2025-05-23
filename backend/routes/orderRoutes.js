const express = require('express');
const router = express.Router();
const {
  placeOrder,
  markDelivered
} = require('../controllers/orderController');

router.post('/place', placeOrder);
router.put('/:id/deliver', markDelivered);

module.exports = router;
