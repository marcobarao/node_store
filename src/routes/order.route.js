const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");

router.get("/", OrderController.index);
router.post("/", OrderController.store);

module.exports = router;
