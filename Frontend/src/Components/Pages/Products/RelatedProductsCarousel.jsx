import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getRelatedProducts } from "../../../service/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCartApi } from "../../../Redux/cart/cartSlice";
import { addToWishlistApi, removeFromWishlistApi } from "../../../Redux/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "-25px",
      transform: "translateY(-50%)",
      backgroundColor: "black",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 5,
    }}
  >
    <ChevronRight size={20} />
  </div>
);

// ✅ Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-25px",
      transform: "translateY(-50%)",
      backgroundColor: "black",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 5,
    }}
  >
    <ChevronLeft size={20} />
  </div>
);

const RelatedProductsCarousel = ({ productId }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // 🩶 Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  // 🧠 Fetch related products
  useEffect(() => {
    if (!productId) return;
    const fetchRelated = async () => {
      try {
        const data = await getRelatedProducts(productId);
        setRelated(data);
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [productId]);

  // 🛒 Add to Cart
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

  // ❤️ Toggle Wishlist
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

  if (loading) return <div>Loading related products...</div>;
  if (!related || related.length === 0) return <div>No related products found.</div>;

  // 🎠 Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="my-5 container position-relative" style={{ overflow: "visible" }}>
      <h3
        className="mb-3"
        style={{ textTransform: "uppercase", fontWeight: 800, fontSize: 24 }}
      >
        Related Products
      </h3>

      <Slider {...settings}>
        {related.map((p) => {
          const slug = p.title.toLowerCase().replace(/\s+/g, "-");
          const inWishlist = isInWishlist(p._id);

          return (
            <div key={p._id} className="px-2">
              <div
                className="card h-100 shadow-sm border-0"
                style={{ borderRadius: "20px", overflow: "hidden" }}
              >
                {/* 🖼️ Image click → Product Details */}
                <div
                  style={{ cursor: "pointer", position: "relative" }}
                  onClick={() => navigate(`/product/${slug}`, { state: { product: p } })}
                >
                  <img
                    src={`https://ridecraft-backend.onrender.com${p.image}`}
                    alt={p.title}
                    className="card-img-top"
                    height="200px"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.3s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>

                {/* 📦 Product Info */}
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title fw-bold text-truncate">{p.title}</h5>
                  <p className="card-text text-muted small mb-2">
                    {p.description.split(" ").slice(0, 6).join(" ")}...
                  </p>
                  <p className="card-text mb-3 fw-semibold">₹{p.salePrice}</p>

                  <div className="d-flex gap-2">
                    {/* 🛒 Add to Cart */}
                    <button
                      className="btn btn-dark flex-grow-1"
                      style={{ borderRadius: "50px", fontWeight: "600" }}
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </button>

                    {/* ❤️ Wishlist */}
                    <button
                      className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: 45, height: 45 }}
                      onClick={() => handleToggleWishlist(p)}
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
      </Slider>
    </div>
  );
};

export default RelatedProductsCarousel;
