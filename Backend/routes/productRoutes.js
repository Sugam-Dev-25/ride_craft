const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");
const { getProducts, getProductsByCategory, searchProducts } = require("../controllers/productController");

// =============== Multer config ===============
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// =============== Product CRUD Routes ===============

// ✅ POST - Add product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      normalPrice,
      salePrice,
      category,
      stock,
      color,
      brand,
      gender,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      title,
      description,
      normalPrice,
      salePrice,
      category,
      stock,
      color,
      brand,
      gender,
      image,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Filter / Category / Search routes (সবচেয়ে উপরে রাখতে হবে)
router.get("/filter/all", getProducts);
router.get("/filter/category/:category", getProductsByCategory);
router.get("/search", searchProducts);

// ✅ Category-based route
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({ category: categoryName }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - All products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - Single Product (এইটা অবশ্যই search route-এর নিচে রাখতে হবে)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - Related products
router.get("/:id/related", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const related = await Product.find({
      brand: product.brand,
      _id: { $ne: product._id },
    }).limit(10);

    res.json(related);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PUT - Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      normalPrice,
      salePrice,
      category,
      stock,
      color,
      brand,
      gender,
    } = req.body;

    const updateData = {
      title,
      description,
      normalPrice,
      salePrice,
      category,
      stock,
      color,
      brand,
      gender,
    };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE - Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
