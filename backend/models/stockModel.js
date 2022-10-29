const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddStockSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    invoice_no: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    file: {
      data: Buffer,
      contentType: String,
    },
    unit_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const NewCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});

// create a model
const AddStock = mongoose.model("Stocks", AddStockSchema);
const NewCategory = mongoose.model("Categories", NewCategorySchema);

module.exports = { AddStock, NewCategory };
