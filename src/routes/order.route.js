const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const authService = require("../services/auth.service");

router.get("/", authService.authorize, OrderController.index);
router.post("/", authService.authorize, OrderController.store);

module.exports = router;
