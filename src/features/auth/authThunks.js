// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Mock login — replace with real API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username ,email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/accounts");
      const accounts = await res.json();

      const user = accounts.find(
        (acc) => acc.username === username && acc.email === email && acc.password === password
      );

      if (!user) {
        return rejectWithValue("Invalid credentials");
      }

      // we can later send a request to login the user from the server
      // For now, we just return user data and login him on the client side
      // using Redux and localStorage

      // Normally you'd get a token from your backend
      return {
        // id: user.id,
        // name: user.name,
        // email: user.email,
        // role: user.role,
        ...user,
        array_BookingsIds: user.array_BookingsIds,
        // token: "fake-jwt-token",
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  // we can later send a request to logout the user from the server
  // For now, we just return user data and logout him on the client side
  // using Redux and localStorage

  return true;
});
