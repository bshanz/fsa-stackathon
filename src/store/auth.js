import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const attemptLogin = createAsyncThunk(
  "auth/attemptLogin",
  async (credentials, { dispatch }) => {
    const response = await axios.post("/api/auth", credentials);
    await window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  }
);

export const loginWithToken = createAsyncThunk(
  "auth/loginWithToken",
  async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      return response.data;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  window.localStorage.removeItem("token");
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(attemptLogin.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default authSlice.reducer;
