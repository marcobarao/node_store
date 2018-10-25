const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

mongoose.connect(
  "mongodb://barao:barao1@ds035787.mlab.com:35787/node_store",
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
