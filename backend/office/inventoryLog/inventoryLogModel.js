const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventoryLogSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Stocks",
  },
  invoiceNo: Number,
  description: String,
  quantity: Number,
  balance: Number,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const InventoryLog = mongoose.model("Inventory Log", InventoryLogSchema);

module.exports = InventoryLog;
