// js/createOrder.js
const axios = require('axios');
const { getAccessToken, PAYPAL_API_BASE } = require('./paypalClient');

async function createOrder(req, res) {
  console.log("createOrder endpoint hit");

  const orderPayload = {
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "EUR",
        value: "100.00"
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
        "Prefer": "return=representation"  // Optional: controls response detail
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
