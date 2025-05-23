const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  tableNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ['New', 'Preparing', 'Delivered'],
    default: 'New'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Razorpay', 'Stripe', 'UPI'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  timestamps: {
    placedAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date }
  }
});

module.exports = mongoose.model('Order', orderSchema);
