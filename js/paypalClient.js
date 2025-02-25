// js/paypalClient.js
const axios = require('axios');

const PAYPAL_CLIENT_ID = "AS8CTzbNN0TnN1lwGxs_VRroGLV8B_pKIShgmi1og8jrj-AbmiAnHBGDCeIqCYO9YCifHeukLRz8znEc";
const PAYPAL_CLIENT_SECRET = "EFNApXAXgpVDLUHKkTnX3G1JkTQS_UQCjd4ErGT1L8y1jm9ezQP8pZkLk1UakE-AC8fhCbnXk7oG5YU5";
const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

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
