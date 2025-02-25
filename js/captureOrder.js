// js/captureOrder.js
const axios = require('axios');
const { getAccessToken, PAYPAL_API_BASE } = require('./paypalClient');

async function captureOrder(req, res) {
  const { orderID } = req.body;
  try {
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    console.log('Capture response:', response.data);
    // Return valid JSON to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error capturing order:", error.response ? error.response.data : error.message);
    // Return error as JSON
    res.status(500).json({ error: "Error capturing order" });
  }
}

module.exports = { captureOrder };
