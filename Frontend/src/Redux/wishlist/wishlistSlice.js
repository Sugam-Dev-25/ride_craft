import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/api";

export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`/wishlists`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addToWishlistApi = createAsyncThunk("wishlist/addToWishlistApi", async ({ productId }, { rejectWithValue }) => {
  try {
    const res = await axios.post(`/wishlists/add`, { productId });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const removeFromWishlistApi = createAsyncThunk("wishlist/removeFromWishlistApi", async ({ productId }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/wishlists/remove`, { productId });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const initialState = { items: [], status: "idle", error: null };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearLocalWishlist(state) { state.items = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.products || [];
        state.status = "succeeded";
      })
      .addCase(addToWishlistApi.fulfilled, (state, action) => {
        state.items = action.payload.products || [];
      })
      .addCase(removeFromWishlistApi.fulfilled, (state, action) => {
        state.items = action.payload.products || [];
      })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
        state.error = action.payload || action.error?.message;
        state.status = "failed";
      });
  }
});

export const { clearLocalWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
 