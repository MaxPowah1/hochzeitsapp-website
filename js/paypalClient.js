// js/paypalClient.js
require('dotenv').config({ path: '.paypalenv' });
const axios = require('axios');

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  try {
    const response = await axios({
      url: `${PAYPAL_API_BASE}/v1/oauth2/token`,
      method: 'post',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${auth}`
      },
      data: "grant_type=client_credentials"
    });
    return response.data.access_token;
  } catch (err) {
    console.error("Error fetching access token:", err.response ? err.response.data : err.message);
    throw err;
  }
}

module.exports = { getAccessToken, PAYPAL_API_BASE };
