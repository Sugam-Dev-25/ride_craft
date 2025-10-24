import React, { useState } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi } from "../../../Redux/cart/cartSlice"; // cart thunk
import { addToWishlistApi, removeFromWishlistApi } from "../../../Redux/wishlist/wishlistSlice"; // wishlist thunks
import RelatedProductsCarousel from "./RelatedProductsCarousel";

const ProductDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const inWishlist = wishlistItems.some((item) => item._id === product?._id);

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h3>Product not found</h3>
        <Link to="/" className="btn btn-dark mt-3">
          Back to Products
        </Link>
      </div>
    );
  }

  // ✅ Add to Cart
  const handleAddToCart = async () => {
    if (!user?.token) {
      alert("Please login to add products to your cart.");
      navigate("/login");
      return;
    }

    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(addToCartApi({ productId: product._id, quantity })).unwrap();
      alert("✅ Product added to cart successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Wishlist Handler
  const handleWishlist = async () => {
    if (!user?.token) {
      alert("Please login to manage your wishlist.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      if (inWishlist) {
        // Remove
        await dispatch(removeFromWishlistApi({ productId: product._id })).unwrap();
        alert("💔 Removed from wishlist");
      } else {
        // Add
        await dispatch(addToWishlistApi({ productId: product._id })).unwrap();
        alert("❤️ Added to wishlist successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Wishlist action failed.");
    } finally {
      setLoading(false);
    }
  };

  const renderColors = () => {
    if (!product.color) return null;
    const colors = product.color.split(",").map((c) => c.trim().toLowerCase());
    return (
      <div className="d-flex align-items-center gap-2 mt-2">
        {colors.map((clr, i) => (
          <div
            key={i}
            title={clr}
            style={{
              width: 25,
              height: 25,
              backgroundColor: clr,
              borderRadius: "50%",
              border: "2px solid #ccc",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 mb-4">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.title}
            className="img-fluid rounded"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">{product.category}</li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>

          <h2 className="fw-bold">{product.title}</h2>

          <div className="d-flex align-items-center mt-3">
            <h4 className="text-dark fw-semibold me-3">${product.salePrice}</h4>
            {product.normalPrice && (
              <h6 className="text-muted text-decoration-line-through">
                ${product.normalPrice}
              </h6>
            )}
          </div>

          <p className="mt-4">{product.description}</p>
          <hr />

          <div className="mb-2" style={{ textTransform: "capitalize" }}>
            <strong>Category:</strong> {product.category}
          </div>

          {product.color && (
            <div className="mb-3">
              <strong>Colors:</strong>
              {renderColors()}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="d-flex align-items-center my-4">
            <div
              className="d-flex align-items-center border rounded-pill px-3 py-1 me-3"
              style={{ width: "130px", justifyContent: "space-between" }}
            >
              <button
                className="btn btn-sm"
                style={{ border: "none" }}
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              >
                −
              </button>
              <span className="fw-bold">{quantity}</span>
              <button
                className="btn btn-sm"
                style={{ border: "none" }}
                onClick={() =>
                  setQuantity((q) => (q < product.stock ? q + 1 : q))
                }
              >
                +
              </button>
            </div>

            <button
              className="btn btn-dark btn-md rounded-pill px-4 fw-semibold"
              disabled={loading || product.stock <= 0}
              onClick={handleAddToCart}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </button>
          </div>

          {/* Wishlist */}
          <button
            className={`btn rounded-pill px-4 ${
              inWishlist ? "btn-danger" : "btn-outline-danger"
            }`}
            disabled={loading}
            onClick={handleWishlist}
          >
            {inWishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
          </button>

          <hr />

          <div className="my-3">
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? (
              <span className="text-success fw-semibold">{product.stock}</span>
            ) : (
              <span className="text-danger fw-semibold">Out of Stock</span>
            )}
            {product.brand && (
              <div className="mb-2">
                <strong>Brand:</strong> {product.brand}
              </div>
            )}
          </div>
        </div>
      </div>
      <RelatedProductsCarousel productId={product?._id} />
    </div>
  );
};

export default ProductDetails;
