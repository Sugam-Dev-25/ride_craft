import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi } from "../../../Redux/cart/cartSlice";
import { addToWishlistApi, removeFromWishlistApi } from "../../../Redux/wishlist/wishlistSlice";
import { useNavigate, Link } from "react-router-dom";

const ProductGrid = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { user } = useSelector((state) => state.auth);

  const isInWishlist = (productId) => wishlistItems.some((item) => item._id === productId);

  const handleAddToCart = async (product) => {
    if (!user) {
      alert("⚠️ Please login to add products to cart.");
      navigate("/login");
      return;
    }
    try {
      await dispatch(addToCartApi({ productId: product._id, quantity: 1 })).unwrap();
      alert(`✅ "${product.title}" added to cart!`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to cart.");
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!user) {
      alert("⚠️ Please login to manage wishlist.");
      navigate("/login");
      return;
    }
    try {
      if (isInWishlist(product._id)) {
        await dispatch(removeFromWishlistApi({ productId: product._id })).unwrap();
        alert(`❌ "${product.title}" removed from wishlist`);
      } else {
        await dispatch(addToWishlistApi({ productId: product._id })).unwrap();
        alert(`❤️ "${product.title}" added to wishlist`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update wishlist");
    }
  };

  if (isLoading) return <p className="text-center text-muted">Loading products...</p>;
  if (products.length === 0) return <p className="text-center text-muted">No products found.</p>;

  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        {products.map((p) => {
          const slug = p.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <div key={p._id} className="col d-flex flex-column align-items-stretch">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "20px", overflow: "hidden" }}>
                {/* ✅ Image click → Product Details */}
                <Link to={`/product/${slug}`} state={{ product: p }}>
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px", cursor: "pointer" }}
                  />
                </Link>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate" style={{ fontWeight: 800 }}>{p.title}</h5>
                  <p className="card-text text-muted">{p.description.split(" ").slice(0, 6).join(" ")}...</p>
                  <p className="card-text text-muted text-truncate">{p.category} | {p.brand}</p>
                  <p className="text-black font-weight-800 mb-3">${p.salePrice}</p>

                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-dark w-100 flex-grow-1"
                      onClick={() => handleAddToCart(p)}
                      disabled={p.stock <= 0}
                      style={{ borderRadius: "50px", backgroundColor: "#000", fontWeight: "600" }}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                      style={{ width: "40px", borderRadius: "50px" }}
                      onClick={() => handleToggleWishlist(p)}
                      title={isInWishlist(p._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      {isInWishlist(p._id) ? <FaHeart className="text-danger" /> : <FaRegHeart />}
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

export default ProductGrid;
