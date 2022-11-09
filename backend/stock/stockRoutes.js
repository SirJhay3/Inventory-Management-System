/**
 * @Route '/stocks'
 */

const express = require("express");
const multer = require('multer');
const {
  addToStock,
  displayStockTable,
  getAllCategory,
  addNewCategory,
  updateStock
} = require("./stockController");

const storage = require('../utils/cloudinary')
const upload = multer({storage: storage})
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//     cb(null, './uploads/');
// }, 
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// })
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//         cb(null, true)
//     } else {
//         cb(new Error('File type is not supported'), false)
//     }
// }

// const upload = multer({
//     storage: storage, limits: {
//     fileSize: 1024 * 1024 * 5
// } });

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
router.post("/add", upload.single("image"), addToStock);

// update new stock
router.patch('/view/:id', updateStock)

// Category routes
router.get("/add/category", getAllCategory);

router.post("/add/category", addNewCategory);

module.exports = router;
