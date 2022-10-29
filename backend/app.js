const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const stockRoutes = require('./routes/stockRoutes');

// Initialize an express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
    .connect(process.env.DB_URI)
    .then(() => app.listen(process.env.PORT, () => {
        console.log('connection established')
    }))
    .catch(err => console.log(err));


// routes
app.use('/stocks',stockRoutes);

