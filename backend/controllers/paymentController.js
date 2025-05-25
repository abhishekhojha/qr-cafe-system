// controllers/paymentController.js
const Setting = require("../models/Settings");

// GET: Retrieve payment method settings
const getPaymentMethods = async (req, res) => {
  try {
    const settings = await Setting.findOne();
    res.json(settings?.paymentMethods || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to get payment methods", error });
  }
};

// PUT: Update payment method settings
const updatePaymentMethods = async (req, res) => {
  try {
    const updates = req.body; // e.g., { cash: true, stripe: false }
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting({ paymentMethods: updates });
    } else {
      settings.paymentMethods = { ...settings.paymentMethods, ...updates };
    }

    await settings.save();
    res.json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update payment methods", error });
  }
};
const createPaymentMethods = async (req, res) => {
  try {
    const defaultMethods = {
      cash: true,
      razorpay: false,
    };

    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting({ paymentMethods: defaultMethods });
    } else if (
      !settings.paymentMethods ||
      Object.keys(settings.paymentMethods).length === 0
    ) {
      settings.paymentMethods = defaultMethods;
    }

    await settings.save();
    res.json({ success: true, paymentMethods: settings.paymentMethods });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create payment methods", error });
  }
};
module.exports = {
  getPaymentMethods,
  createPaymentMethods,
  updatePaymentMethods,
};
