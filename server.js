// server.js
const express = require('express');
const path = require('path');
const app = express();

// Route to serve index.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Optional: Serve static assets (e.g., CSS, JS, images) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
