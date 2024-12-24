import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientId: "",
  productId: "",
  price: "",
  quantity: "",
  priceAtSale: "",
  total: "",
  paymentMethod: "",
  statusOrder: "",
  saleDate: "",
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transactionData: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanTransactionData: () => {
      return initialState;
    },
  },
});

export const { transactionData, cleanTransactionData } =
  transactionSlice.actions;

export default transactionSlice.reducer;
