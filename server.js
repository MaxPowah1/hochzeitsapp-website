const express = require('express');
const path = require('path');
const { createOrder } = require('./js/createOrder');
const { captureOrder } = require('./js/captureOrder'); // You need to implement this
const app = express();

app.use(express.json());

// API endpoint for creating an order
app.post('/create-order', createOrder);

// API endpoint for capturing an order
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
