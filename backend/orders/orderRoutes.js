const express = require("express");

const router = express.Router();

const { postOrders } = require("./orderController");

router.post("/", postOrders);

module.exports = router;
