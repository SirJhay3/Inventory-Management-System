const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceListingSchema = new Schema({
  invoiceNo: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const InventoryLogSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Stocks",
  },
  invoiceNo: Number,
  description: String,
  quantity: Number,
  balanceQty: Number,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const InventoryLog = mongoose.model("Inventory Log", InventoryLogSchema);
const InvoiceListing = mongoose.model("Invoice Listing", InvoiceListingSchema);

module.exports = { InventoryLog, InvoiceListing };