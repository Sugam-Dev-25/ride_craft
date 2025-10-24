import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service/api";

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get("/carts");
    return res.data.items || [];
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Add to cart
export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await API.post("/carts/add", { productId, quantity });
      return res.data.items || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update cart item
export const updateCartApi = createAsyncThunk(
  "cart/updateCartApi",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await API.put("/carts/update", { productId, quantity });
      return res.data.items || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Remove single item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/carts/remove/${productId}`);
      return res.data.items || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Clear cart
export const clearCartApi = createAsyncThunk(
  "cart/clearCartApi",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete("/carts/clear");
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = { items: [], status: "idle", error: null };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addToCartApi.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartApi.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCartApi.fulfilled, (state) => {
        state.items = [];
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.error = action.payload || action.error?.message;
        state.status = "failed";
      });
  },
});

export default cartSlice.reducer;
