// server.js
const express = require('express');
const path = require('path');
const { createOrder } = require('./js/createOrder');
const app = express();

app.use(express.json());

// Define your API route BEFORE static middleware
app.post('/create-order', createOrder);

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
