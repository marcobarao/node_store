const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

const config = require("./config");

mongoose.connect(
  config.connectionString,
  { useNewUrlParser: true }
);
requireDir("./models");

const indexRoute = require("./routes/index.route");
const productRoute = require("./routes/product.route");
const customerRoute = require("./routes/customer.route");
const orderRoute = require("./routes/order.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);

module.exports = app;
