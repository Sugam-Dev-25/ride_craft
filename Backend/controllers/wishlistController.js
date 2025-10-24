const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) wishlist = new Wishlist({ user: userId, products: [] });

    // avoid duplicates
    if (!wishlist.products.some(p => p.toString() === productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    await wishlist.populate({ path: "products", select: "title salePrice image stock description category " });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/wishlistController.js

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId })
      .populate({ path: "products", select: "title salePrice image stock description category" });

    if (!wishlist) return res.json({ products: [] });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    await wishlist.save();
    await wishlist.populate({ path: "products", select: "title salePrice image stock description category" });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

