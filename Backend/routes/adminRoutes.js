const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Dummy admin info
const ADMIN = {
  email: "admin@ridecraft.com",
  password: "123456",
  name: "Ride Craft",
  image: "https://ahaanmedia.com/designing/design/RideCraft.png"
};

// 🔹 Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "2h",
    });

    return res.json({
      success: true,
      token,
      admin: {
        name: ADMIN.name,
        image: ADMIN.image,
        email: ADMIN.email,
      },
    });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
