const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const stockRoutes = require("./stock/stockRoutes");
const officeRoutes = require("./office/officeRoutes");

// Initialize an express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// async function connectDB() {
//     try {

//     } catch (error) {

//     }
// }

// Database connection
mongoose
  .connect(process.env.DB_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("connection established + PORT:" + process.env.PORT);
    })
  )
  .catch((err) => console.log(err));

// routes
app.use("/stocks", stockRoutes);
app.use('/office', officeRoutes)
