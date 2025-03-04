const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const { createOrder } = require('./js/createOrder');
const { createPendingOrder } = require('./js/createPendingOrder');
const { captureOrder } = require('./js/captureOrder');
const Order = require('./models/Order'); // Import the Order model

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB – update the connection string as needed.
mongoose.connect('mongodb://localhost:27017/orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
});

app.use(express.json({ limit: '50mb' })); // Allow large payloads

// API endpoints
app.post('/create-order', createOrder);
app.post('/create-pending-order', createPendingOrder);
app.post('/capture-order', captureOrder);

// GET endpoint to retrieve an order by its paypal.orderID using the "orders" route.
app.get('/orders/:orderID', async (req, res) => {
  const orderID = req.params.orderID;
  try {
    // Query using the paypal.orderID field in the Order model
    const order = await Order.findOne({ 'paypal.orderID': orderID });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT endpoint to update an order by its paypal.orderID.
app.put('/orders/:orderID', async (req, res) => {
  const orderID = req.params.orderID;
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { 'paypal.orderID': orderID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
