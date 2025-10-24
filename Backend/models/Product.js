const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    normalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

// ✅ Text search optimization
productSchema.index({
  title: "text",
  description: "text",
  brand: "text",
  category: "text",
});

module.exports = mongoose.model('Product', productSchema);
