import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createLogin: (state, action) => {
      const { username, token } = action.payload;
      state.username = username;
      state.token = token;
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    },
    logout: (state, action) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("signup");
      authApi.util.resetApiState();
    },
  },
});

// Log the initialState
console.log("Initial State:", initialState);

export const { createLogin, logout } = authSlice.actions;

export default authSlice.reducer;
