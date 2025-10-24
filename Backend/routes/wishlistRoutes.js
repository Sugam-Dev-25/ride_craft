const express = require("express");
const router = express.Router();
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");


router.post("/add", protect, addToWishlist);


router.get("/", protect, getWishlist);          
router.get("/:userId", protect, getWishlist);   


router.put("/remove", protect, removeFromWishlist);

module.exports = router;
