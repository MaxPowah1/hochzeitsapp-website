// server.js
const express = require('express');
const paypal = require('@paypal/paypal-server-sdk');
require('dotenv').config();

const app = express();
app.use(express.json());

// Set up PayPal environment and client
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Endpoint to create an order
app.post('/api/orders', async (req, res) => {
  try {
    // For demo purposes, we're using static order details.
    // In a real app, you'd build this using the cart details from req.body.
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
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to capture an order
app.post('/api/orders/:orderId/capture', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const response = await client.execute(request);
    res.json(response.result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Serve your static website (if needed)
app.use(express.static('public')); // Adjust 'public' to your static folder if different

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
