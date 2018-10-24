const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.index);
router.get("/:slug", ProductController.show);
router.get("/tags/:tags", ProductController.showByTags);
router.get("/admin/:id", ProductController.showById);
router.post("/", ProductController.store);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.destroy);

module.exports = router;
