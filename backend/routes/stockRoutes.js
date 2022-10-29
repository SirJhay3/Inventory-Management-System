const express = require("express");
const {
  addToStock,
  displayStockTable,
  getAllCategory,
  addNewCategory,
} = require("../controllers/stockController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

// GET all stocks
router.get("/", (req, res) => {
  res.redirect("/stocks/view");
});

router.get("/view", displayStockTable);

// GET added stocks form
router.get("/add", (req, res) => {
  res.json({ mssg: "Add Stocks" });
});

// POST new stocks
router.post("/add", upload.single("stockImage"), addToStock);

// Category routes
router.get("/category", getAllCategory);

router.post("/category", addNewCategory);

module.exports = router;
