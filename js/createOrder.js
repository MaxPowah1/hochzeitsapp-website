const axios = require('axios');
const { getAccessToken, PAYPAL_API_BASE } = require('./paypalClient');

async function createOrder(req, res) {
  console.log("createOrder endpoint hit");
  // Retrieve price from the request (ensure the client sends this)
  const { price } = req.body;

  // Validate the price if necessary
  if (!price) {
    return res.status(400).send("Price is required");
  }

  const orderPayload = {
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "EUR",
        value: String(price)  // Ensure it’s a string, e.g., "49.99"
      }
    }]
  };

  try {
    const accessToken = await getAccessToken();

    const response = await axios({
      url: `${PAYPAL_API_BASE}/v2/checkout/orders`,
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Prefer": "return=representation"
      },
      data: orderPayload
    });

    console.log("Order created:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Error creating order:", err.response ? err.response.data : err.message);
    res.status(500).send("Error creating order");
  }
}


module.exports = { createOrder };
