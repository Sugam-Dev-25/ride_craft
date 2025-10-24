import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const API = axios.create({ baseURL: BASE_URL });

// 🔹 Token interceptor (for user auth)
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});


// 🔹 Fetch all products
export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// 🔹 Fetch all categories
export const getCategories = async () => {
  try {
    const response = await API.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// 🔹 Fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const url = `/categories/${encodeURIComponent(category)}`;
    console.log("Fetching from URL:", BASE_URL + url);
    const response = await API.get(url);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category "${category}":`, error);
    throw error;
  }
};

// 🔹 Fetch filtered products based on query parameters
export const getFilteredProducts = async (filters) => {
  try {
    const params = new URLSearchParams(filters);
    const url = `/products/filter/all?${params.toString()}`;
    console.log("Fetching filtered products from:", BASE_URL + url);
    const { data } = await API.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

// 🔹 Create Order
export const createOrder = (data) => API.post("/orders", data);

// 🔹 Fetch all contacts
export const getContacts = async () => {
  try {
    const response = await API.get("/contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// 🔹 Create a new contact (form submission)
export const createContact = async (data) => {
  try {
    await API.post("/contact", data);
  } catch (error) {
    console.error("Error sending contact:", error);
    throw error;
  }
};


// 🔹 Register user (with profile picture)
export const registerUser = (formData) =>
  API.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 🔹 Login user
export const loginUser = (credentials) => API.post("/users/login", credentials);

// 🔹 Get user profile
export const getUserProfile = () => API.get("/users/profile");

// 🔹 Wishlist routes
export const addToWishlist = (productId) =>
  API.post(`/wishlists/add`, { productId });

export const removeFromWishlist = (productId) =>
  API.delete(`/wishlists/remove/${productId}`);

export const getWishlist = () => API.get(`/wishlists`);

// 🔹 Cart routes
export const addToCart = (productId, quantity = 1) =>
  API.post(`/carts/add`, { productId, quantity });

export const removeFromCart = (productId) =>
  API.delete(`/carts/remove/${productId}`);

export const getCart = () => API.get(`/carts`);

export const clearCart = () => API.delete(`/carts/clear`);

// 🔹 Fetch related products (based on category)
export const getRelatedProducts = async (productId) => {
  try {
    const response = await API.get(`/products/${productId}/related`);
    return response.data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
};

// ✅ Search products
export const searchProducts = async (query) => {
  try {
    const res = await API.get(`/products/search?q=${query}`);
    return res.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
 
export default API;