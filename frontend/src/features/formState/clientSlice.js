import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: "",
  contacts: "",
  email: "",
  city: "",
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    clientData: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanData: (state) => {
      return initialState;
    },
  },
});

export const { clientData, cleanData, clientEditData } = clientSlice.actions;

export default clientSlice.reducer;
