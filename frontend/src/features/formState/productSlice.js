import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: "",
  price: "",
  quantityInStock: "",
  reorderLevel: "",
  category: "",
  status: "",
  description: "",
  image: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productData: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanProductData: (state) => {
      return initialState;
    },
  },
});

export const { productData, cleanProductData } = productSlice.actions;

export default productSlice.reducer;
