const axios = require('axios');
const { getAccessToken, PAYPAL_API_BASE } = require('./paypalClient');
const Order = require('../models/Order');

async function captureOrder(req, res) {
  console.log("captureOrder endpoint hit");

  // Expecting the client to send:
  // - orderID: the PayPal order ID.
  // - billing: an object with fields: name, mobile, email, city, state, zip, address.
  // - config: a JSON string containing the Flutter configuration.
  const { orderID, billing, config } = req.body;

  try {
    const accessToken = await getAccessToken();

    // Capture the order from PayPal.
    const response = await axios({
      url: `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });

    console.log("Capture response:", response.data);
    const captureData = response.data;

    // Create a new Order document to store in MongoDB.
    // We store the billing details, the Flutter config (parsed as JSON), and
    // essential PayPal capture details (orderID, status, and the entire capture response).
    const newOrder = new Order({
      billing: billing,
      config: JSON.parse(config),
      paypal: {
        orderID: orderID,
        status: captureData.status,
        captureDetails: captureData,
      }
    });

    await newOrder.save();

    // Respond back with the capture details.
    res.json(captureData);
  } catch (err) {
    console.error("Error capturing order:", err.response ? err.response.data : err.message);
    res.status(500).send("Error capturing order");
  }
}

module.exports = { captureOrder };
