const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Token generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER user
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      country,
      state,
      district,
      pincode,
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    let profilePic = "";
    if (req.file) profilePic = `/uploads/${req.file.filename}`;

    const user = await User.create({
      name,
      email,
      password,
      profilePic,
      phone,
      address,
      country,
      state,
      district,
      pincode,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      phone: user.phone,
      address: user.address,
      country: user.country,
      state: user.state,
      district: user.district,
      pincode: user.pincode,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        phone: user.phone,
        address: user.address,
        country: user.country,
        state: user.state,
        district: user.district,
        pincode: user.pincode,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
