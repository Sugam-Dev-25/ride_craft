const Product = require("../models/Product");

// ✅ Get all or filtered products
const getProducts = async (req, res) => {
  try {
    const { category, brand, color, gender, priceMin, priceMax } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (color) filter.color = color;
    if (gender) filter.gender = gender;

    if (priceMin || priceMax) {
      filter.salePrice = {};
      if (priceMin) filter.salePrice.$gte = Number(priceMin);
      if (priceMax) filter.salePrice.$lte = Number(priceMax);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Search products
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "Search query missing!" });

    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Error searching products" });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  searchProducts,
};
