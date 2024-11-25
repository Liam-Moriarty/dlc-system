import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientId: {
    company: "",
    city: "",
  },
  productId: [
    {
      products: {
        product: "",
        price: "",
      },
      quantity: "",
      priceAtSale: "",
      total: "",
    },
  ],
  totalAmount: "",
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
    updateTransactionData: (state, action) => {
      const { index, productData } = action.payload;
      if (state.productId[index]) {
        state.productId[index] = { ...state.productId[index], ...productData };
      }
    },
  },
});

export const { transactionData, cleanTransactionData, updateTransactionData } =
  transactionSlice.actions;

export default transactionSlice.reducer;
