const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ title: "Node Store API", version: "0.0.1" });
});

module.exports = router;
