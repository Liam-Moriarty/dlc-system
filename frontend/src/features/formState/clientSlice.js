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
    clientEditData: (state, action) => {
      return {
        ...state,
        company: action.payload.company,
        contacts: action.payload.contacts,
        email: action.payload.email,
        city: action.payload.city,
        isEditMode: true,
      };
    },
    cleanData: (state) => {
      return initialState;
    },
  },
});

export const { clientData, cleanData, clientEditData } = clientSlice.actions;

export default clientSlice.reducer;
