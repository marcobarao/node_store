const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/CustomerController");

router.post("/", CustomerController.store);
router.post("/auth", CustomerController.authenticate);

module.exports = router;
