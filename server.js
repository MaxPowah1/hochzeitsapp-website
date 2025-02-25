// server.js
const express = require('express');
const path = require('path');
const { createOrder } = require('./js/createOrder');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to serve index.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// API endpoint for creating a PayPal order
app.post('/create-order', createOrder);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
