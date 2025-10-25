import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../../../service/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartApi
} from "../../../Redux/cart/cartSlice";
import {
  addToWishlistApi,
  removeFromWishlistApi
} from "../../../Redux/wishlist/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          setLoading(true);
          const res = await searchProducts(query);
          setProducts(res);
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [query]);

  const truncateDescription = (description, wordLimit = 10) => {
    if (!description) return "";
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  // Add to Cart
  const handleAddToCart = async (product) => {
    if (!user) {
      alert("⚠️ Please login first to add to Cart.");
      navigate("/login");
      return;
    }
    try {
      await dispatch(addToCartApi({ productId: product._id, quantity: 1 })).unwrap();
      alert(`✅ "${product.title}" has been added to the Cart`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to the Cart.");
    }
  };

  // Toggle Wishlist
  const handleToggleWishlist = async (product) => {
    if (!user) {
      alert("⚠️ Please login first to manage your Wishlist.");
      navigate("/login");
      return;
    }
    try {
      if (isInWishlist(product._id)) {
        await dispatch(removeFromWishlistApi({ productId: product._id })).unwrap();
        alert(`❌ "${product.title}" has been removed from the Wishlist`);
      } else {
        await dispatch(addToWishlistApi({ productId: product._id })).unwrap();
        alert(`❤️ "${product.title}" has been added to the Wishlist`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update the Wishlist.");
    }
  };

  return (
    <div className="container my-5 px-4">
      <h2 className="mb-4 text-center">
        Search Results for <span className="text-danger">"{query}"</span>
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <h5>No products found.</h5>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {products.map((product) => {
            const slug = product.title.toLowerCase().replace(/\s+/g, "-");
            const inWishlist = isInWishlist(product._id);

            return (
              <div className="col" key={product._id}>
                <div className="card h-100 shadow-sm">
                  {/* Image click → product details */}
                  <Link to={`/product/${slug}`} state={{ product }}>
                    <img
                      src={
                        product.image?.startsWith("http")
                          ? product.image
                          : `https://ridecraft-backend.onrender.com${product.image}`
                      }
                      alt={product.title}
                      className="card-img-top"
                      height="200"
                      style={{ objectFit: "cover", cursor: "pointer" }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="fw-bold mb-1">{product.title}</h6>
                    <p className="text-muted small mb-1">
                      {truncateDescription(product.description, 8)}
                    </p>
                    <p className="fw-bold text-dark mb-2">${product.salePrice}</p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-dark flex-grow-1"
                        style={{ borderRadius: "50px", fontWeight: "600" }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 45, height: 45 }}
                        onClick={() => handleToggleWishlist(product)}
                        title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        {inWishlist ? <FaHeart className="text-danger" /> : <FaRegHeart />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
