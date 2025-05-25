const express = require("express");
const router = express.Router();
const {
  getPaymentMethods,
  updatePaymentMethods,
} = require("../controllers/paymentController");

router.get("/payment-methods", getPaymentMethods);
router.put("/payment-methods", updatePaymentMethods);

module.exports = router;
