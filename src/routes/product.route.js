const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.post("/", ProductController.store);

router.put("/:id", ProductController.update);

router.delete("/", ProductController.destroy);

module.exports = router;
