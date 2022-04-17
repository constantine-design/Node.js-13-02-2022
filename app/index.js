const express = require("express");
const { homeRouter } = require("./api/home/controller.js");

const app = express();
app.use('/', homeRouter);

module.exports = { app };





