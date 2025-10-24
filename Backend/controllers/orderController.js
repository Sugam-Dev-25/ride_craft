const Order = require("../models/Order");

/**
 * 🟢 Create New Order
 */
exports.createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      zip,
      city,
      state,
      country,
      phone,
      email,
      items,
      grandTotal,
      shippingMode,
    } = req.body;

    if (!firstName || !lastName || !email || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or empty items list",
      });
    }

    const orderId = "ORD-" + Date.now();

    const newOrder = new Order({
      orderId,
      firstName,
      lastName,
      address,
      zip,
      city,
      state,
      country,
      phone,
      email,
      items,
      grandTotal,
      shippingMode,
      createdAt: new Date(),
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "✅ Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

/**
 * 🟢 Get All Orders (For Admin Dashboard)
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("❌ Fetch orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

