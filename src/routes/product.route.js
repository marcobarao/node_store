const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const authService = require("../services/auth.service");

router.get("/", ProductController.index);
router.get("/:slug", ProductController.show);
router.get("/tags/:tags", ProductController.showByTags);
router.get("/admin/:id", ProductController.showById);
router.post("/", authService.authorize, ProductController.store);
router.put("/:id", authService.authorize, ProductController.update);
router.delete("/:id", authService.authorize, ProductController.destroy);

module.exports = router;
