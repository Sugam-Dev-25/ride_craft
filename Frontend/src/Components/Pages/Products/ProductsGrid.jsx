import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../service/api"; 
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { addToCartApi } from "../../../Redux/cart/cartSlice"; // ✅ async thunk

const ProductsGrid = () => {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const dispatch = useDispatch(); 

  const truncateDescription = (description, wordLimit = 10) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return description;
  };

  const handleAddToCart = async (product) => {
    try {
      await dispatch(addToCartApi({ productId: product._id, quantity: 1 })).unwrap();
      alert(`✅ "${product.title}" added to cart!`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to cart.");
    }
  };

  if (isLoading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) return <div>No products found.</div>;

  const displayedProducts = products.slice(0, 8);

  return (
    <div className="container my-5 px-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {displayedProducts.map((product) => {
          const slug = product.title.toLowerCase().replace(/\s+/g, "-");
          return (
            <div className="col" key={product._id}>
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "20px", overflow: "hidden" }}>
                <Link to={`/product/${slug}`} state={{ product }}>
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.title}
                    className="card-img-top"
                    height="200px"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body d-flex flex-column align-items-left">
                  <h5 className="card-title" style={{ fontWeight: 800, fontSize: 20 }}>
                    {product.title}
                  </h5>
                  <p className="card-text">{truncateDescription(product.description, 7)}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${product.salePrice}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <button
                    className="btn btn-primary w-50"
                    style={{
                      backgroundColor: "#000000ff",
                      border: "none",
                      borderRadius: "50px",
                      height: "45px",
                      fontWeight: "600",
                    }}
                    onClick={() => handleAddToCart(product)} 
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsGrid;
