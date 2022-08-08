"use strict";
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const responseMessage = require('./server/utils/responseMessage');
const responseHelper = require('./server/utils/responseHelper');
const bodyParser = require("body-parser");
const configDB = require("./config/db");

mongoose.connect(configDB.mongoMainUrl);
//------------------------------------------- MAIN DB CONNECTION EVENTS-----------------------------------------------//
// When successfully connected
mongoose.connection.on("connected", async function () {
    console.log("INFO ::: Connected to main MongoDB ");
    mongoose.set("debug", true);
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
    console.error("ERROR ::: Mongoose main connection error: " + JSON.stringify(err));
});


// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
    console.log("INFO ::: Mongoose main connection disconnected");
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function () {
    console.log("INFO ::: Mongoose main connection disconnected");
});

// app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
require("./routes")(app);
// catch 404 and forward to error handler
app.use((request, response, next) => {
    let res = new responseMessage.GenericFailureMessage();
    res.reason = 'EOF';
    responseHelper(null, response, res, res.code);
    next();
});
app.listen(5000, () => { console.log('Server is Listening on Port 5000') })