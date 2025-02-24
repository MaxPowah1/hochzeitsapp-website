// server.js
const express = require('express');
const paypal = require('@paypal/paypal-server-sdk');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Set up PayPal environment and client (Sandbox mode)
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Endpoint to create an order
app.post('/api/orders', async (req, res) => {
  try {
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.prefer("return=representation");
    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: "100.00",
          },
        },
      ],
    });

    const response = await client.execute(orderRequest);
    res.json(response.result);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to capture an order
app.post('/api/orders/:orderId/capture', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const captureRequest = new paypal.orders.OrdersCaptureRequest(orderId);
    captureRequest.requestBody({});
    const response = await client.execute(captureRequest);
    res.json(response.result);
  } catch (error) {
    console.error('Error capturing order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html from the same directory as server.js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Optionally, serve other static assets (e.g., CSS, JS) from a "public" folder.
// If you have assets in a "public" folder, ensure they are referenced correctly in index.html.
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
