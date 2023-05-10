import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import postReducer from "./postSlice"; // Import the posts reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer, // Add the posts reducer to the store configuration
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export * from "./auth";
export * from "./postSlice"; // Export everything from postSlice
