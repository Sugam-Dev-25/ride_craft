const express = require("express");
const {
  getCategories,
  getProductsByCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategories);
router.get("/:category", getProductsByCategory);

module.exports = router;

