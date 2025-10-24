const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('uploads folder created automatically');
}

// Middlewares
app.use(cors());
app.use(express.json());

// Static folder for uploaded images
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Server Connected'))
  .catch(err => console.log(err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
const contactRoutes = require('./routes/contactRoutes');
app.use('/api', contactRoutes);
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const wishlistRoutes = require('./routes/wishlistRoutes');
app.use('/api/wishlists', wishlistRoutes);
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/carts', cartRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
