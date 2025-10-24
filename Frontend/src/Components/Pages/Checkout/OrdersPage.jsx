import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const { state: order } = useLocation();

  if (!order)
    return (
      <div className="text-center py-5">
        <h4>No order found!</h4>
        <Link to="/" className="btn btn-dark mt-3">
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="container py-5">
      {/* ✅ Header */}
      <h2 className="fw-bold text-success mb-3">Order Placed Successfully!</h2>
      <h5>
        Order ID: <span className="text-danger">{order.orderId}</span>
      </h5>
      <hr />

      {/* ✅ Customer Info */}
      <div className="mb-4">
        <h5 className="fw-bold">Customer Details:</h5>
        <p className="mb-1">
          {order.firstName} {order.lastName}
        </p>
        <p className="mb-1">
          {order.address}, {order.city}, {order.state} - {order.zip}
        </p>
        <p className="mb-1">{order.country}</p>
        <p className="mb-1">
          📞 {order.phone} | ✉️ {order.email}
        </p>
      </div>

      {/* ✅ Order Table */}
      <h5 className="mb-3">Order Summary:</h5>
      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.productId}>
              {/* ✅ Product Image */}
              <td>
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `http://localhost:5000${item.image}` // ✅ Add backend base URL
                  }
                  alt={item.title}
                  width="80"
                  height="70"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #eee",
                  }}
                  onError={(e) => (e.target.src = "/no-image.jpg")} // fallback
                />
              </td>

              {/* ✅ Product Details */}
              <td>{item.title}</td>
              <td>{item.brand || "-"}</td>
              <td>{item.category || "-"}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                ${(item.totalAmount || item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Total */}
      <div className="text-end mt-3">
        <h5>
          <strong>Grand Total:</strong> $
          {order.grandTotal?.toFixed(2) || "0.00"}
        </h5>
      </div>

      {/* ✅ Continue Button */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-dark px-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
