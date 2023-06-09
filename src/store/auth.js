import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./usersSlice";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

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
  async (_, { dispatch }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data)); // dispatch the setUser action with the user data
      return response.data;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  window.localStorage.removeItem("token");
  return {};
});

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/register", credentials);
      console.log(response.data.token);
      await window.localStorage.setItem("token", response.data.token);
      dispatch(loginWithToken());
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      })
      .addCase(register.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(setUser, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      });
  },
});

export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;

// add pending status for setuser and fetchuser
