import React from "react";

const OrderTable = ({ orders }) => {
  return (
    <div className="card shadow mb-4">
      {/* Header */}
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Order List</h5>
      </div>

      {/* Table */}
      <div className="card-body table-responsive" style={{ overflowX: "auto" }}>
        <table
          className="table table-bordered table-hover table-striped align-middle text-center"
          style={{ width: "100%" }} // Table width set to 100% (you can adjust this)
        >
          <thead
            className="table-dark"
            style={{ backgroundColor: "#000000ff" }}
          >
            <tr>
              <th>#</th>
              <th style={{ width: "150px" }}>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Total ($)</th>
              <th>Shipping</th>
              <th style={{ width: "300px" }}>Items</th>{" "}
              {/* Set width for "Items" column */}
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-muted text-center">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td style={{ fontWeight: "600", color: "#000" }}>{index + 1}</td>
                  <td
                    className="fw-semibold text-success"
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                  >
                    #{order.orderId}
                  </td>
                  <td style={{ fontWeight: "600", color: "#000" }}>
                    {order.firstName} {order.lastName}
                  </td>
                  <td style={{ fontWeight: "600", color: "#000" }}>{order.email}</td>
                  <td style={{ fontWeight: "600", color: "#000" }}>{order.phone}</td>
                  <td style={{ fontWeight: "600", color: "#000" }}>{order.city}</td>
                  <td className="fw-bold " style={{ fontWeight: "600", color: "#000" }}>
                    ${parseFloat(order.grandTotal).toFixed(2)}
                  </td>
                  <td style={{ textTransform: "capitalize", fontWeight: "600", color: "#000" }}>
                    {order.shippingMode}
                  </td>
                  <td style={{ textAlign: "left", width: "300px" }}>
                    {" "}
                    {/* Set width for "Items" column */}
                    <ul className="list-unstyled mb-0">
                      {order.items.map((item, i) => (
                        <li key={i} className="small mb-2">
                          {/* Image */}
                          {item.image && (
                            <img
                              src={`https://ridecraft-backend.onrender.com${item.image}`}
                              alt={item.title}
                              style={{
                                width: "50px",
                                height: "35px",
                                marginRight: "10px",
                                objectFit: "cover",
                                borderRadius: "4px",
                                verticalAlign: "middle",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                padding: "2px",
                              }}
                            />
                          )}
                          {/* Title and quantity */}
                          <span style={{ fontWeight: "600", color: "#000" }}>
                            {item.title.split(" ")[0]}
                            {item.title.split(" ")[1]} × {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ fontWeight: "600", color: "#000" }}>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
