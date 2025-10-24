import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  removeCartItem,
  clearCartApi,
  updateCartApi,
} from "../../../Redux/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [shippingMode, setShippingMode] = useState("pickup");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalPrice = items.reduce(
    (acc, item) =>
      acc + (item.productId?.salePrice || 0) * (item.quantity || 1),
    0
  );

  const handleRemove = (productId) => dispatch(removeCartItem(productId));
  const handleClear = () => dispatch(clearCartApi());
  const handleQuantityChange = (productId, quantity) =>
    dispatch(updateCartApi({ productId, quantity }));

  if (!items.length)
    return (
      <div className="container text-center my-5">
        <h3>Your Cart is Empty 🛒</h3>
        <Link to="/" className="btn btn-dark mt-3">
          Back to Shop
        </Link>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold">My Cart</h1>
        <button
          className="btn btn-outline-danger"
          onClick={handleClear}
          style={{ borderRadius: "50px" }}
        >
          Clear Cart
        </button>
      </div>

      <div className="table-responsive mb-4">
        <table className="table align-middle">
          <thead className="border-bottom">
            <tr className="text-muted small">
              <th>PRODUCT</th>
              <th>COLOR</th>
              <th>PRICE</th>
              <th className="text-center">QTY</th>
              <th className="text-end">TOTAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const product = item.productId;
              if (!product) return null;
              return (
                <tr key={item._id}>
                  <td className="d-flex align-items-center gap-3 py-3">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.title}
                      style={{
                        width: "100px",
                        height: "75px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                    <div>
                      <h6>{product.title}</h6>
                    </div>
                  </td>
                  <td>
                    {product.color?.name || product.color || "N/A"}{" "}
                    {product.color?.hex && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "15px",
                          height: "15px",
                          backgroundColor: product.color.hex,
                          borderRadius: "50%",
                          marginLeft: "8px",
                          border: "1px solid #ccc",
                        }}
                      ></span>
                    )}
                  </td>

                  <td>${product.salePrice?.toFixed(2)}</td>
                  <td className="text-center">
                    <div
                      className="d-inline-flex align-items-center justify-content-center border rounded-pill"
                      style={{
                        overflow: "hidden",
                        width: "110px",
                        height: "38px",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <button
                        className="btn btn-sm text-secondary"
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "35px",
                          height: "38px",
                          fontSize: "18px",
                        }}
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        −
                      </button>

                      <span
                        className="fw-semibold"
                        style={{
                          width: "40px",
                          textAlign: "center",
                          fontSize: "16px",
                        }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-sm text-secondary"
                        style={{
                          border: "none",
                          background: "transparent",
                          width: "35px",
                          height: "38px",
                          fontSize: "18px",
                        }}
                        onClick={() =>
                          handleQuantityChange(product._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="text-end">
                    ${(product.salePrice * item.quantity).toFixed(2)}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm text-danger"
                      onClick={() => {
                        console.log(
                          "🗑 Removing product id:",
                          item.productId?._id || item.productId
                        );
                        handleRemove(item.productId?._id || item.productId);
                      }}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row justify-content-between">
        <div className="col-md-6 bg-light p-4 rounded shadow-sm">
          <h5>Choose shipping mode:</h5>
          <div className="form-check mb-2">
            <input
              type="radio"
              id="pickup"
              checked={shippingMode === "pickup"}
              onChange={() => setShippingMode("pickup")}
            />
            <label htmlFor="pickup">Store pickup (FREE)</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              id="home"
              checked={shippingMode === "home"}
              onChange={() => setShippingMode("home")}
            />
            <label htmlFor="home">Delivery at home ($9.90)</label>
          </div>
        </div>

        <div className="col-md-4 bg-light p-4 rounded shadow-sm">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <strong>{shippingMode === "pickup" ? "Free" : "9.90$"}</strong>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <h5>Total</h5>
            <h5 className="text-danger fw-bold">
              $
              {shippingMode === "pickup"
                ? totalPrice.toFixed(2)
                : (totalPrice + 9.9).toFixed(2)}
            </h5>
          </div>
          <Link to="/checkout">
            <button
              className="btn w-100 py-2 fw-semibold text-white"
              style={{
                backgroundColor: "#FF4C00",
                borderRadius: "50px",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e64500"; // hover color
                e.target.style.boxShadow = "0 4px 10px rgba(255, 76, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FF4C00";
                e.target.style.boxShadow = "none";
              }}
            >
              Checkout — $
              {shippingMode === "pickup"
                ? totalPrice.toFixed(2)
                : (totalPrice + 9.9).toFixed(2)}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
