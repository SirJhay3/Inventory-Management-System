const express = require("express");
const mongoose = require("mongoose");
// const socketio = require("socket.io");
const cors = require("cors");
// const http = require("http");
require("dotenv").config();

const loginRoutes = require("./login/loginRoutes");
const stockRoutes = require("./stock/stockRoutes");
const chatRoutes = require("./chat/chatRoutes");
const officeRoutes = require("./office/officeRoutes");
const customerRoutes = require("./customer/customerRoutes");
const salesRoutes = require("./sales/salesRoutes");
const collectionsRoutes = require("./collections/collectionsRoutes");
const dashboardRoutes = require("./dashboard/dashboardRoutes");
const orderRoutes = require("./orders/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Initialize an express app
const app = express();

// Initialize server and setup socket
// const server = http.createServer(app);
// const io = socketio(server);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// io.on("connection", (socket) => {
//   console.log("We have a new connection");

//   socket.on("disconnect", () => {
//     console.log("user has left");
//   });
// });
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
app.use("/chat", chatRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/stocks", stockRoutes);
app.use("/office", officeRoutes);
app.use("/customers", customerRoutes);
app.use("/sales", salesRoutes);
app.use("/collections", collectionsRoutes);
app.use("/orders", orderRoutes);

// api error handlers
app.use(notFound);
app.use(errorHandler);
