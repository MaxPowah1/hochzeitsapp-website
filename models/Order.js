// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  billing: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    address: { type: String, required: true },
  },
  config: { type: Schema.Types.Mixed, required: true }, // Flutter configuration JSON
  paypal: {
    orderID: { type: String, required: true },
    status: { type: String, required: true },
    captureDetails: { type: Schema.Types.Mixed },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
