import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  passwordChangeDate: "",
};

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    createSignup: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanSignUp: (state, action) => {
      return initialState;
    },
  },
});

export const { createSignup, cleanSignUp } = signUpSlice.actions;

export default signUpSlice.reducer;
