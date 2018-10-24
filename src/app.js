const express = require("express");

const indexRoute = require("./routes/index.route");
const productRoute = require("./routes/product.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", productRoute);

module.exports = app;
