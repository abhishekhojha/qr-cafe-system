const Settings = require('../models/Settings');

// Get or create default settings
exports.getSettings = async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  res.json(settings);
};

// Update payment method toggles
exports.updatePaymentMethods = async (req, res) => {
  const { cash, razorpay, stripe, upi } = req.body;

  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});

  settings.paymentMethods = { cash, razorpay, stripe, upi };
  await settings.save();

  res.json({ message: 'Payment methods updated', settings });
};
