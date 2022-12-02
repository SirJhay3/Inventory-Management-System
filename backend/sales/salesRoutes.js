const express = require('express');
const { paginatedResults } = require('../utils/paginate');
const { Sales } = require('./salesModel');
const router = express.Router()
const {
  postSales,
  returnGetSalesInfo,
  updateSalesInfo,
  getAllSales,
  singleSaleRecord,
  salesEvaluation
} = require("./salesController");

// get all sales record
router.get('/',paginatedResults(Sales),  getAllSales)

// post sales details
router.post('/new', postSales)

// get all sales information for returns
router.get("/returns", returnGetSalesInfo);

// update sales information
router.patch('/returns', updateSalesInfo)

// get a single customer sales record
router.get('/logs/:id', singleSaleRecord)

// sales evaluation
router.get('/evaluation', salesEvaluation)

module.exports = router;