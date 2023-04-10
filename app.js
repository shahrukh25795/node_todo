const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require('./api/routes/user');
const { STATUS_CODE } = require("./api/utils/constants");


mongoose.connect(process.env.MONGO_URL).then(res => console.log(`mongodb is connected`)).catch(err => console.log(`error occurs while connecting==>${err}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(STATUS_CODE.success_status).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/", userRoutes);

module.exports = app;
