import React, { useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./Redux/cart/cartSlice";
import { fetchWishlist } from "./Redux/wishlist/wishlistSlice";

import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import Home from "./Components/Pages/Home/Home";
import ProductDetails from "./Components/Pages/Products/ProductDetails";
import CartPage from "./Components/Pages/AddToCart/CartPage";
import WishlistPage from "./Components/Pages/Wishlist/WishlistPage";
import Shop from "./Components/Pages/Shop/Shop";
import CheckoutPage from "./Components/Pages/Checkout/CheckoutPage";
import OrderSuccessPage from "./Components/Pages/Checkout/OrdersPage";
import About from "./Components/Pages/About/About";
import Contact from "./Components/Pages/Contact/Contact";
import CategoryProducts from "./Components/Pages/Products/CategoryProducts";
import Register from "./Components/Pages/Register/Register";
import Login from "./Components/Pages/Login/Login";
import Profile from "./Components/Pages/Profile/Profile";
import SearchResults from "./Components/Pages/Search/SearchResults";

// ✅ Theme Configuration
const theme = createTheme({
  typography: {
    fontFamily: `"Wix Madefor Display", sans-serif`,
  },
  palette: {
    background: { default: "#ffffff" },
    text: { primary: "#000000" },
  },
});

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // ✅ When user logs in, auto-fetch Cart and Wishlist from DB
  useEffect(() => {
    if (user?.token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [user?.token, dispatch]);

  // ✅ Route guard for protected routes (like Profile, Checkout)
  const PrivateRoute = ({ element }) => {
    return user?.token ? element : <Navigate to="/login" replace />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/category-products/:category" element={<CategoryProducts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
          {/* Protected Routes (Only after login) */}
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
          <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} />} />
          <Route path="/checkout" element={<PrivateRoute element={<CheckoutPage />} />} />
          <Route path="/order-success" element={<PrivateRoute element={<OrderSuccessPage />} />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
