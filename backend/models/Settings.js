const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  paymentMethods: {
    cash: { type: Boolean, default: true },
    razorpay: { type: Boolean, default: false },
    stripe: { type: Boolean, default: false },
    upi: { type: Boolean, default: true }
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
