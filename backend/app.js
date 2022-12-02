const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const loginRoutes = require("./login/loginRoutes");
const stockRoutes = require("./stock/stockRoutes");
const officeRoutes = require("./office/officeRoutes");
const customerRoutes = require("./customer/customerRoutes");
const salesRoutes = require("./sales/salesRoutes");
const collectionsRoutes = require("./collections/collectionsRoutes");
const dashboardRoutes = require("./dashboard/dashboardRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Initialize an express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
      console.log("connection established");
    })
  )
  .catch((err) => console.log(err));

// routes
app.use("/user", loginRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/stocks", stockRoutes);
app.use("/office", officeRoutes);
app.use("/customers", customerRoutes);
app.use("/sales", salesRoutes);
app.use("/collections", collectionsRoutes);

// api error handlers
app.use(notFound);
app.use(errorHandler);
