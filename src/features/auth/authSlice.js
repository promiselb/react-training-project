// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authThunks";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser ,
  loading: false,
  error: null,
  isAuthenticated: ((v) => !!v)(storedUser),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export const selectAuth = (state) => state.auth;
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
