const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ title: "Node Store API", version: "0.0.1" });
});

module.exports = app;
