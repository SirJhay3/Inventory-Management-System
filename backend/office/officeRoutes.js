const express = require("express");
const { paginatedResults } = require("../utils/paginate");
const { InvoiceListing } = require("./officeModel");
const { AddStock } = require("../stock/stockModel");
const {
  getAllProducts,
  getProductsById,
  getAllInvoice,
  getSingleInvoice,
  getReturnRecords,
  getSingleReturnRecord,
  getCustomersDebts,
} = require("./officeController");
const router = express.Router();

// RETURN RECORDS
router.get("/return-records", getReturnRecords);

router.get("/return-records/:id", getSingleReturnRecord);

// INVOICE LISTING
// get all invoices
router.get("/invoice-listing", paginatedResults(InvoiceListing), getAllInvoice);

// get a single invoice details
router.get("/invoice-listing/:id", getSingleInvoice);

// DEBTS LISTING
// get all customers with outstanding balance
router.get("/debts-listing", getCustomersDebts);

// INVENTORY LOG
router.get("/inventory-log", paginatedResults(AddStock), getAllProducts);

router.get("/inventory-log/:id", getProductsById);

module.exports = router;
