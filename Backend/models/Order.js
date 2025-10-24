const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },

  // 🧍 Customer Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },

  // 🛒 Items Info
  items: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      brand: { type: String },
      category: { type: String },
      image: { type: String }, // ✅ added image field
      totalAmount: { type: Number, required: true },
    },
  ],

  grandTotal: { type: Number, required: true },
  shippingMode: { type: String, default: "pickup" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
