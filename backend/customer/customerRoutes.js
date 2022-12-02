const express = require('express');
const router = express.Router()

const {
  addCustomer,
  getAllCustomers,
  singleCustomerSalesDetails,
} = require("./customerController");
const { Customers } = require('./customerModel');
const { paginatedResults } = require('../utils/paginate');

// get all customers
router.get('/',paginatedResults(Customers), getAllCustomers)

// get a single customer details 
router.get("/:id", singleCustomerSalesDetails);

// add new customer
router.post('/new', addCustomer)

module.exports = router