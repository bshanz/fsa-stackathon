import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const token = window.localStorage.getItem("token");
  const response = await axios.get("/api/posts", {
    headers: { Authorization: token },
  });
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/posts/createpost", initialPost, {
      // corrected URL
      headers: { Authorization: token },
    });
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.postAdded = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.postAdded = true;
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
