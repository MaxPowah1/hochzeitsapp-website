const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { createOrder } = require('./js/createOrder');
const { captureOrder } = require('./js/captureOrder');
const app = express();

// Connect to MongoDB
// Replace 'your-database-name' with your actual database name or use an environment variable.
mongoose.connect('mongodb://localhost:27017/your-database-name');
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
});

app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed


// API endpoints
app.post('/create-order', createOrder);
app.post('/capture-order', captureOrder);

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
