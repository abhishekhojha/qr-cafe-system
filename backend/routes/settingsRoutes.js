const express = require('express');
const router = express.Router();
const {
  getSettings,
  updatePaymentMethods
} = require('../controllers/settingsController');

router.get('/', getSettings);
router.put('/payment-methods', updatePaymentMethods);

module.exports = router;
