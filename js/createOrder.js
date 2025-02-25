// js/createOrder.js
const { client } = require('./paypalClient');
const paypal = require('@paypal/paypal-server-sdk');

async function createOrder(req, res) {
  console.log("createOrder endpoint hit"); // Debug logging

  const request = new paypal.orders.OrdersCreateRequest();
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
    const response = await client().execute(request);
    res.json({ id: response.result.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
}

module.exports = { createOrder };
