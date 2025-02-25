// createOrder.js
const { client } = require('paypalClient');
const paypal = require('@paypal/paypal-server-sdk');

async function createOrder(req, res) {
  // Create a new order request
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD', // or your desired currency
        value: '100.00'       // the amount for the order
      }
    }]
  });

  try {
    // Execute the request
    const response = await client().execute(request);
    // Send the order ID back to the client
    res.json({ id: response.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
}

module.exports = { createOrder };
