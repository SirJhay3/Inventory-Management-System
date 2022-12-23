const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerName: String,
  orderId: String,
  items: {
    type: Array,
    default: [],
  },
  totalAmount: Number,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = { Orders };
