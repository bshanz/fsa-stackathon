import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import postReducer from "./postSlice"; // Import the posts reducer
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: usersReducer, // Add the posts reducer to the store configuration
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export * from "./auth";
export * from "./postSlice"; // Export everything from postSlice
export * from "./usersSlice";
