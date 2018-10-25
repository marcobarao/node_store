const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/CustomerController");
const authService = require("../services/auth.service");

router.post("/", CustomerController.store);
router.post("/auth", CustomerController.authenticate);
router.post("/refresh", authService.authorize, CustomerController.refreshToken);

module.exports = router;
