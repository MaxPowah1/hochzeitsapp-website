const axios = require('axios');
const { getAccessToken, PAYPAL_API_BASE } = require('./paypalClient');
const Order = require('../models/Order');

// Retry mechanism: retries the provided async operation a specified number of times.
async function retryAsyncOperation(operation, retries = 3, delay = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      await operation();
      return;
    } catch (err) {
      if (attempt === retries - 1) {
        throw err;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
}

async function captureOrder(req, res) {
  console.log("captureOrder endpoint hit");

  // Expected data from the client: orderID, billing information, and the config JSON string.
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

    // Use a retry mechanism to update (or create) the order record in MongoDB.
    await retryAsyncOperation(async () => {
      // Attempt to update an existing pending order with the new details.
      const updatedOrder = await Order.findOneAndUpdate(
        { 'paypal.orderID': orderID },
        {
          billing: billing,
          config: JSON.parse(config),
          paypal: {
            orderID: orderID,
            status: captureData.status,
            captureDetails: captureData,
          }
        },
        { new: true }
      );

      // If no order exists, create a new pending order record.
      if (!updatedOrder) {
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
      }
    }, 3, 1000);

    res.json(captureData);
  } catch (err) {
    console.error("Error capturing order:", err.response ? err.response.data : err.message);
    res.status(500).send("Error capturing order");
  }
}

module.exports = { captureOrder };
