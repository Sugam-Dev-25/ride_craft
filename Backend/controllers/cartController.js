const Cart = require("../models/Cart");
const Product = require("../models/Product");

// 🧡 Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existing = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (existing) {
      existing.quantity = Math.max(1, existing.quantity + Number(quantity));
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "title salePrice image stock color",
    });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 🧡 Get User Cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.productId",
      select: "title salePrice image stock color",
    });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧡 Update Item Quantity
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      // যদি quantity 0 হয়, তাহলে remove করে দাও
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId
      );
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "title salePrice image stock color",
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧡 Remove single item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    console.log("🛒 RemoveFromCart called with productId:", productId);

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const beforeCount = cart.items.length;

    // ✅ safer comparison whether populated or ObjectId
    cart.items = cart.items.filter((i) => {
      const pid = i.productId && i.productId._id ? i.productId._id : i.productId;
      if (pid.equals) return !pid.equals(productId);
      return pid.toString() !== productId.toString();
    });

    if (cart.items.length === beforeCount) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "title salePrice image stock color",
    });

    res.json({
      message: "Item removed successfully",
      items: cart.items,
    });
  } catch (error) {
    console.error("❌ Remove cart item error:", error);
    res.status(500).json({ message: error.message });
  }
};


// 🧡 Clear Entire Cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared", items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
