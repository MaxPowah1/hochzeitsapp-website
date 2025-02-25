// js/createOrder.js
const { client } = require('./paypalClient');
const paypal = require('@paypal/paypal-server-sdk');

async function createOrder(req, res) {
  console.log("createOrder endpoint hit");

  // Try accessing OrdersCreateRequest as a property on the paypal object
  const OrdersCreateRequest = paypal.OrdersCreateRequest;
  if (typeof OrdersCreateRequest !== "function") {
    console.error("OrdersCreateRequest is not available as a constructor");
    return res.status(500).send("Server configuration error");
  }

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
