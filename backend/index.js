const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes (empty for now)
app.get('/', (req, res) => {
  res.send('QR Café Backend Running');
});

const ingredientRoutes = require('./routes/ingredientRoutes');
app.use('/api/ingredients', ingredientRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/api/menu', menuItemRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const settingsRoutes = require('./routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);

const verifyFirebaseToken = require("./middleware/auth");

app.post("/api/protected-route", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api", paymentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
