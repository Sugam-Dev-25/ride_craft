// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Redux/auth/authSlice";
import cartReducer from "../Redux/cart/cartSlice";
import wishlistReducer from "../Redux/wishlist/wishlistSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// Persist configuration
const persistConfig = {
  key: "root", // key for storage (can be customized)
  storage, // Specify localStorage as the storage engine
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid issues with redux-persist
    }), 
});

// Persistor for Redux
export const persistor = persistStore(store); // Export persistor
