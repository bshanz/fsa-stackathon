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

// New thunk for editing a post
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, url, description }) => {
    console.log(`wwwwwwwwwwwwwwwwww ${id}`);
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/posts/editpost/${id}`,
      { url, description },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);

// New thunk for deleting a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const token = window.localStorage.getItem("token");
  const response = await axios.delete(`/api/posts/deletepost/${id}`, {
    headers: { Authorization: token },
  });
  return id;
});

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
      })
      // Handle editing a post
      .addCase(editPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Find the post that needs to be updated, and update it
        const existingPost = state.posts.find(
          (post) => post.id === action.payload.id
        );
        if (existingPost) {
          existingPost.url = action.payload.url;
          existingPost.description = action.payload.description;
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted post from state
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
