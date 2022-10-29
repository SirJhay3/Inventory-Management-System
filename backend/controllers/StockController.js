const { AddStock, NewCategory } = require("../models/stockModel");
// get stocks

// get stocks table
const displayStockTable = async (req, res) => {
  const stocks = await AddStock.find({});

  res.status(200).json(stocks);
};

// post added stocks
const addToStock = async (req, res) => {
  const { product_name, category, quantity, unit_price } = req.body;

  // add document to database
  try {
    const stock = await AddStock.create({
      product_name,
      category,
      quantity,
      unit_price,
    });
    res.status(200).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get all categories
const getAllCategory = async (req, res) => {
  const categories = await NewCategory.find({});

  res.status(200).json(categories);
};
// post new category
const addNewCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const newCategory = await NewCategory.create({ category });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addToStock,
  displayStockTable,
  getAllCategory,
  addNewCategory,
};
