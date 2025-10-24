import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createOrder } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    shippingMode: "pickup",
  });

  const subtotal = items.reduce(
  (acc, item) => acc + (item.productId?.salePrice || 0) * (item.quantity || 1),
  0
);


  const shippingCost = form.shippingMode === "home" ? 9.9 : 0;
  const grandTotal = subtotal + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      items: items.map((i) => ({
  productId: i.productId?._id,
  title: i.productId?.title,
  quantity: i.quantity,
  price: i.productId?.salePrice,
  category: i.productId?.category,
  brand: i.productId?.brand,
  image: i.productId?.image,
  totalAmount: (i.productId?.salePrice || 0) * (i.quantity || 1),
})),

      grandTotal,
    };

    try {
      const { data } = await createOrder(orderData);
      navigate("/order-success", { state: data.order });
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Checkout</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            required
            rows="2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          ></textarea>
        </div>

        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Zip</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Country</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="col-12">
          <h6 className="fw-bold mt-3">Shipping Mode:</h6>
          <div>
            <input
              type="radio"
              name="ship"
              checked={form.shippingMode === "pickup"}
              onChange={() => setForm({ ...form, shippingMode: "pickup" })}
            />{" "}
            Store Pickup (Free)
          </div>
          <div>
            <input
              type="radio"
              name="ship"
              checked={form.shippingMode === "home"}
              onChange={() => setForm({ ...form, shippingMode: "home" })}
            />{" "}
            Home Delivery (9.90$)
          </div>
        </div>

        <div className="col-12 text-end">
  <button className="btn btn-dark px-4">
    Confirm Order — $
    {(
      subtotal + 
      (form.shippingMode === "home" ? 9.9 : 0)
    ).toFixed(2)}
  </button>
</div>

      </form>
    </div>
  );
};

export default CheckoutPage;
