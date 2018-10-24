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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
