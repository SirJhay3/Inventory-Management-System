const express = require('express');
const router = express.Router();
const {
  getCustomerDetails,
  updateCustomerDetails,
} = require("./collectionsController");


router.get('/', getCustomerDetails);

router.patch('/', updateCustomerDetails);

module.exports = router