const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const authService = require("../services/auth.service");

router.get("/", ProductController.index);
router.get("/:slug", ProductController.show);
router.get("/tags/:tags", ProductController.showByTags);
router.get("/admin/:id", ProductController.showById);
router.post("/", authService.isAdmin, ProductController.store);
router.put("/:id", authService.isAdmin, ProductController.update);
router.delete("/:id", authService.isAdmin, ProductController.destroy);

module.exports = router;
