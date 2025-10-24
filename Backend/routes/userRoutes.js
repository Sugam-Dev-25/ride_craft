const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { registerUser, loginUser } = require("../controllers/userController");

// multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);

module.exports = router;
