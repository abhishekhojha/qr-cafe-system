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
app.use('/api/menu-items', menuItemRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const settingsRoutes = require('./routes/settingsRoutes');
app.use('/api/settings', settingsRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
