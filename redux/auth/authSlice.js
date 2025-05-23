import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn:
    typeof window !== "undefined" && localStorage.getItem("userToken")
      ? true
      : false,
  user: null,
  token:
    typeof window !== "undefined" && localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", action.payload.token);
      }
    },
    loginFailure: (state, action) => {
      state.error = action.payload.error;
      state.isAuthenticated = false;
      state.userToken = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    checkAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("userToken");
        state.isAuthenticated = !!token;
        state.userToken = token;
      }
    },
  },
});

export const { loginSuccess, logout, checkAuth, loginFailure } = authSlice.actions;

export default authSlice.reducer;
