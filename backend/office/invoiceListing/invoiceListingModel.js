const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceListingSchema = new Schema({
  invoiceNo: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const InvoiceListing = mongoose.model('Invoice Listing', InvoiceListingSchema);

module.exports = {InvoiceListing}