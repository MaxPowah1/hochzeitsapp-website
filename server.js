const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const { createOrder } = require('./js/createOrder');
const { createPendingOrder } = require('./js/createPendingOrder');
const { captureOrder } = require('./js/captureOrder');
const Order = require('./models/Order'); // Existing Order model
const Configuration = require('./models/Configuration'); // Configuration model
require('dotenv').config({ path: '.paypalenv' });


// NEW: Import Firebase Admin SDK
const admin = require('firebase-admin');

// Load service account from 1 folder below the current directory.
const serviceAccountPath = path.join(__dirname, '..', 'firemsg.json');
const serviceAccount = require(serviceAccountPath);

// Initialize the Firebase Admin SDK using the service account credentials.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Optionally, you can explicitly specify the projectId:
  // projectId: serviceAccount.project_id,
});

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

// ----- Order Endpoints -----
// These endpoints remain unchanged.
app.post('/create-order', createOrder);
app.post('/create-pending-order', createPendingOrder);
app.post('/capture-order', captureOrder);

// ----- Configuration Endpoints -----

// GET configuration by configurationID.
app.get('/configurations/:configurationID', async (req, res) => {
  const configurationID = req.params.configurationID;
  try {
    const config = await Configuration.findOne({ configurationID });
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to save (or update) configuration.
app.post('/save-config', async (req, res) => {
  try {
    const configData = req.body; // Expect full configuration, including configurationID
    const existingConfig = await Configuration.findOne({ configurationID: configData.configurationID });
    if (existingConfig) {
      // Update the existing document with new data and atomically increment __v
      const updatedConfig = await Configuration.findOneAndUpdate(
        { configurationID: configData.configurationID },
        { $set: configData, $inc: { __v: 1 } },
        { new: true, runValidators: true }
      );
      res.status(200).json({ message: 'Configuration updated successfully', configuration: updatedConfig });
    } else {
      // Create a new configuration document (new documents start with __v = 0 by default)
      const newConfig = new Configuration(configData);
      await newConfig.save();
      res.status(200).json({
        message: 'New configuration saved successfully',
        configurationID: configData.configurationID
      });
    }
  } catch (error) {
    console.error("Error saving configuration:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----- New: Push Notification Endpoint -----
// This endpoint sends a push notification to a topic named with the configurationID.
app.post('/sendPushMessage', async (req, res) => {
  const { configurationID, title, body } = req.body;
  if (!configurationID || !title || !body) {
    return res.status(400).json({ error: 'Missing configurationID, title, or body' });
  }

  const message = {
    topic: configurationID, // Use configurationID as the topic
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    // The response is a message ID string
    res.status(200).json({ name: response });
  } catch (error) {
    console.error("Error sending push message:", error);
    res.status(500).json({ error: error.toString() });
  }
});

// ----- Static Files and Root -----
// Serve index.html on the root URL.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
