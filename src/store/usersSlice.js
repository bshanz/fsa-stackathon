import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPost } from "./postSlice";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// Add this action
export const setUser = createAction("user/setUser");

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = window.localStorage.getItem("token");
  const response = await axios.get("/api/user", {
    headers: { Authorization: token },
  });
  return response.data;
});

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async (updatedUser, { dispatch }) => {
//     const token = window.localStorage.getItem("token");
//     const response = await axios.put("/api/user", updatedUser, {
//       headers: { Authorization: token },
//     });
//     // Fetch the updated user again after updating it
//     dispatch(fetchUser());
//     return response.data;
//   }
// );
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedUser, { dispatch, getState }) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/user", updatedUser, {
      headers: { Authorization: token },
    });

    // Fetch the updated user again after updating it
    dispatch(fetchUser());

    // Fetch the posts again to get the updated user data in posts
    const posts = getState().posts.posts;
    for (let post of posts) {
      dispatch(fetchPost(post.id));
    }

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle update user action
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      });
  },
});

export default userSlice.reducer;

//export const selectUser = (state) => state.auth && state.auth.user;
