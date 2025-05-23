const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const { db } = require("../firebase/firebaseAdmin");
const { deductInventoryFIFO } = require('../utils/inventoryUtils');

// Place new order
exports.placeOrder = async (req, res) => {
  try {
    const { items, tableNumber, paymentMethod } = req.body;

    const newOrder = new Order({
      items,
      tableNumber,
      paymentMethod,
      status: "New",
      paymentStatus: paymentMethod === "Cash" ? "Pending" : "Paid",
    });

    const savedOrder = await newOrder.save();

    // Write to Firestore for real-time dashboard
    await db
      .collection("orders")
      .doc(savedOrder._id.toString())
      .set({
        items,
        tableNumber,
        status: "New",
        timestamps: {
          placedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });

    res.status(201).json({ message: "Order placed", order: savedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as Delivered
exports.markDelivered = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Deduct ingredients after delivery
    await deductInventoryFIFO(order.items);

    order.status = 'Delivered';
    order.timestamps.deliveredAt = new Date();
    await order.save();

    await db.collection('orders').doc(id).update({
      status: 'Delivered',
      'timestamps.updatedAt': new Date().toISOString()
    });

    res.status(200).json({ message: 'Order marked as delivered', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};