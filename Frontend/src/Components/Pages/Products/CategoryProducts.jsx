import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi } from "../../../Redux/cart/cartSlice";
import { addToWishlistApi, removeFromWishlistApi } from "../../../Redux/wishlist/wishlistSlice";
import { getProductsByCategory } from "../../../service/api";
import banner from "../../../../public/BannerImage5.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CategoryProducts = () => {
  const location = useLocation();
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryName, products: initialProducts } = location.state || {
    categoryName: "",
    products: [],
  };

  const currentCategory =
    categoryName || category?.replace(/-/g, " ") || "Products";

  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Short description
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


  // Fetch products if direct URL
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!initialProducts?.length && currentCategory) {
        setLoading(true);
        try {
          const formattedCategory = currentCategory
            .toLowerCase()
            .replace(/\s+/g, "-");
          const data = await getProductsByCategory(formattedCategory);
          setProducts(data);
        } catch (error) {
          console.error("Error fetching category products:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCategoryProducts();
  }, [currentCategory]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading products for {currentCategory}...</h4>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h3>{currentCategory}</h3>
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category Banner */}
      <div
        className="d-flex align-items-center justify-content-center text-center position-relative"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-3 text-white fw-bold text-uppercase">
            {currentCategory}
          </h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container my-5 px-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {products.map((product) => {
            const slug = product.title.toLowerCase().replace(/\s+/g, "-");
            const inWishlist = isInWishlist(product._id);
            return (
              <div className="col" key={product._id}>
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{ borderRadius: "20px", overflow: "hidden" }}
                >
                  {/* Image click → product details */}
                  <div
                    style={{ cursor: "pointer", position: "relative" }}
                    onClick={() => navigate(`/product/${slug}`, { state: { product } })}
                  >
                    <img
                      src={`https://ridecraft-backend.onrender.com${product.image}`}
                      alt={product.title}
                      className="card-img-top"
                      height="220px"
                      style={{ objectFit: "cover", transition: "transform 0.3s" }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>

                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title fw-bold text-truncate">{product.title}</h5>
                    <p className="card-text text-muted small mb-2">
                      {truncateDescription(product.description, 8)}
                    </p>
                    <p className="card-text mb-2 fw-semibold">₹{product.salePrice}</p>

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
      </div>
    </div>
  );
};

export default CategoryProducts;
