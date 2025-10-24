import axios from "axios";

// 🔹 Common API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if deployed
});

// ==========================
// ✅ PRODUCT APIs
// ==========================

// 🔸 Get all products
export const getProducts = () => API.get("/products");

// 🔸 Get single product by ID
export const getProductById = (id) => API.get(`/products/${id}`);

// 🔸 Add new product (with image upload)
export const addProduct = (formData) =>
  API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 🔸 Update existing product
export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// 🔸 Delete product
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// 🔸 Get products by category (optional)
export const getProductsByCategory = (category) =>
  API.get(`/products/category/${category}`);

// 🔸 Search products (optional)
export const searchProducts = (query) =>
  API.get(`/products/search?q=${query}`);


// ==========================
// ✅ ORDER APIs
// ==========================

// 🔸 Get all orders
export const getOrders = () => API.get("/orders");

// 🔸 Get single order by ID
export const getOrderById = (id) => API.get(`/orders/${id}`);

// 🔸 Delete order
export const deleteOrder = (id) => API.delete(`/orders/${id}`);


// ==========================
// ✅ CONTACT APIs
// ==========================

// 🔸 Get all contacts
export const getContacts = () => API.get("/contacts");

// 🔸 Delete contact
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

