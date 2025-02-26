const Order = require('../models/Order');

async function createPendingOrder(req, res) {
  const { orderID, billing, config } = req.body;

  try {
    const pendingOrder = new Order({
      billing: billing,
      config: JSON.parse(config),
      paypal: {
        orderID: orderID,
        status: "pending",
        captureDetails: {}
      }
    });
    await pendingOrder.save();
    console.log("Pending order created for orderID:", orderID);
    res.json({ message: "Pending order created" });
  } catch (err) {
    console.error("Error creating pending order:", err);
    res.status(500).send("Error creating pending order");
  }
}

module.exports = { createPendingOrder };
