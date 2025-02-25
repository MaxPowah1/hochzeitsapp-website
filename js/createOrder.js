// js/createOrder.js
const { client } = require('./paypalClient');
const { OrdersCreateRequest } = require('@paypal/paypal-server-sdk');

async function createOrder(req, res) {
  console.log("createOrder endpoint hit");

  const request = new OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: '100.00'
      }
    }]
  });

  try {
    console.log("Sending request to PayPal Sandbox...");
    const response = await client().execute(request);
    console.log("Received response from PayPal:", response.result);
    res.json({ id: response.result.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
}

module.exports = { createOrder };
