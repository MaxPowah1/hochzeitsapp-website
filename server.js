// server.js
const express = require('express');
const path = require('path');
const { createOrder } = require('./js/createOrder');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint for creating a PayPal order (defined early)
app.post('/create-order', createOrder);

// Serve index.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/test', (req, res) => {
  console.log("Test endpoint hit");
  res.json({ message: "Test successful" });
});


// Serve static files from the root directory
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
