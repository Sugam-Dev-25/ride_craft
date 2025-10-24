const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

// 🧡 Add item to cart
router.post("/add", protect, addToCart);

// 🧡 Get user cart
router.get("/", protect, getCart);

// 🧡 Update quantity
router.put("/update", protect, updateCartItem);

// 🧡 Remove single item
router.delete("/remove/:productId", protect, removeFromCart);

// 🧡 Clear all items
router.delete("/clear", protect, clearCart);

module.exports = router;
