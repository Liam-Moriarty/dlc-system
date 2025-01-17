import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliersId: "",
  productDetails: "",
  type: "",
  movementStatus: "",
  quantity: "",
  location: "",
  createdBy: "",
};

export const movementSlice = createSlice({
  name: "movement",
  initialState,
  reducers: {
    movementData: (state, action) => {
      return { ...state, ...action.payload };
    },
    cleanMovement: (state) => {
      return initialState;
    },
  },
});

export const { movementData, cleanMovement } = movementSlice.actions;

export default movementSlice.reducer;
