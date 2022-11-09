const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddStockSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
        path: {
          // cloudinary secure url
          type: String,
        },
        filename: {
          // cloudinary public id
          type: String,
        },
      },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const NewCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});


// create a model
const AddStock = mongoose.model("Stocks", AddStockSchema);
const NewCategory = mongoose.model("Categories", NewCategorySchema);

module.exports = { AddStock, NewCategory };
