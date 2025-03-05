const Order = require('../models/Order');

async function createPendingOrder(req, res) {
  const { orderID, billing, config, idempotencyKey } = req.body;
  console.log("Received pending order data:", req.body);

  try {
    // Check if an order with the given idempotency key already exists
    const existingOrder = await Order.findOne({ idempotencyKey });
    if (existingOrder) {
      console.log("Order already exists with idempotency key:", idempotencyKey);
      return res.json(existingOrder);
    }

    // Create a new pending order
    const pendingOrder = new Order({
      billing: billing,
      config: { configurationID: JSON.parse(config).configurationID },
      paypal: {
        orderID: orderID,
        status: "pending",
        captureDetails: {}
      },
      idempotencyKey: idempotencyKey
    });

    const savedOrder = await pendingOrder.save();
    console.log("Pending order created and saved:", savedOrder);
    res.json(savedOrder);
  } catch (err) {
    console.error("Error creating pending order:", err);
    res.status(500).send("Error creating pending order");
  }
}

module.exports = { createPendingOrder };
