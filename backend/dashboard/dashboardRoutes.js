const express = require('express');
const router = express.Router()
const {
  getDashboardDetails,
  getBarChartDetails,
  getPieChartDetails,
} = require("./dashboardController");

router.get('/', getDashboardDetails)

router.get('/bar', getBarChartDetails);

router.get('/pie', getPieChartDetails)

module.exports = router