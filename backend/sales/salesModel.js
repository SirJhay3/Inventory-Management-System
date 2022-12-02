const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
  customerName: String,
  invoiceNo: Number,
  salesItems: {
      type: Array,
      default: [],
  },
  totalAmount: Number,
  salesMode: String,
  cashPaid: Number,
  transfer: Number,
  balance: Number,
  debtStatus: String,
  returnStatus: Boolean,
  returnAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = { Sales };
