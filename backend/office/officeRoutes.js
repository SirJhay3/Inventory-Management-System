const express = require('express');
const router = express.Router()
const { getAllInvoice } = require('./invoiceListing/invoiceListingController');

router.get('/invoice-listing', getAllInvoice);

module.exports = router