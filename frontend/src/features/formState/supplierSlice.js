import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: "",
  email: "",
  contacts: "",
  location: "",
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    supplierData: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanSupplier: (state) => {
      return initialState;
    },
  },
});

export const { supplierData, cleanSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
