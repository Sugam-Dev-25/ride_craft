import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCartApi } from "../../../Redux/cart/cartSlice";
import { removeFromWishlistApi } from "../../../Redux/wishlist/wishlistSlice";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const WishlistPage = () => {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveWishlist = (productId) => {
    console.log("Removing from wishlist:", productId);
    dispatch(removeFromWishlistApi({ productId }));
  };

  const handleAddToCart = async (product) => {
    try {
      // Dispatch the async thunk and wait for completion
      await dispatch(
        addToCartApi({ productId: product._id, quantity: 1 })
      ).unwrap();

      // Show success alert
      alert(`✅ "${product.title}" added to cart!`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to cart. Please try again.");
    }
  };

  const truncateDescription = (text, limit = 10) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  if (items.length === 0) {
    return (
      <div className="container text-center my-5">
        <h3>Your Wishlist is Empty ❤️</h3>
        <Link to="/" className="btn btn-dark mt-3">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-left fw-bold">My Wishlist</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {items.map((product) => {
          const slug = product.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <div className="col" key={product._id}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: "20px", overflow: "hidden" }}
              >
                {/* ✅ Clickable Image with Link */}
                <Link to={`/product/${slug}`} state={{ product }}>
                  <img
                    src={`https://ridecraft-backend.onrender.com${product.image}`}
                    alt={product.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>

                <div className="card-body text-left">
                  <h6 className="card-title fw-semibold">{product.title}</h6>
                  <p className="text-muted small">
                    {truncateDescription(product.description)}
                  </p>
                  <p className="text-dark fw-bold mb-3">
                    ${product.salePrice || 0}
                  </p>
                  <p
                    className="text-dark mb-3"
                    style={{ textTransform: "capitalize" }}
                  >
                    Category: {product.category}
                  </p>

                  <div className="d-flex justify-content-between gap-3">
                    <button
                      className="btn btn-sm btn-danger px-5 py-2 rounded-5"
                      onClick={() => handleRemoveWishlist(product._id)}
                      style={{ fontWeight: "600" }}
                    >
                      Remove Wishlist
                    </button>
                    <button
                      className="btn btn-sm px-2 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart size={22} style={{ color: "#000" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
