import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productName: "",
  clientName: "",
  unitPrice: "",
  quantity: "",
  totalPrice: "",
  dateOfSale: "",
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transactionData: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanTransactionData: (state) => {
      return initialState;
    },
  },
});

export const { transactionData, cleanTransactionData } =
  transactionSlice.actions;

export default transactionSlice.reducer;
