const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');

// Multer config for local upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // uploads folder
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST - Add product
router.post('/', upload.single('image'), async (req, res) => {
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
      gender
    } = req.body;

    // if file uploaded
    const image = req.file ? `/uploads/${req.file.filename}` : '';

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
      image
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err); // debug log
    res.status(500).json({ message: err.message });
  }
});

// GET - All products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET - Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE - Product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET - Products by category
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({ category: categoryName }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// import { getProducts, getProductsByCategory } from "../controllers/productController.js";
const { getProducts, getProductsByCategory, searchProducts } = require("../controllers/productController");

// 🔹 Filter-based or all product fetch
router.get("/filter/all", getProducts);

// 🔹 Category-wise product fetch
router.get("/filter/category/:category", getProductsByCategory);

// ✅ Search route
router.get("/search", searchProducts);

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


module.exports = router;
