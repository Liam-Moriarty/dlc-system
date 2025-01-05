import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import clientReducer from "../features/formState/clientSlice";
import productReducer from "../features/formState/productSlice";
import transactionReducer from "../features/formState/transactionSlice";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import signupReducer from "../features/auth/signUpSlice";

import { clientApi } from "../api/generalApi/clientApi";
import { productsApi } from "../api/generalApi/productsApi";
import { transactionApi } from "../api/generalApi/transactionApi";

import { analyticsApi } from "../api/analyticsApi/performanceApi";
import { authApi } from "../api/authApi/authApi";

export const store = configureStore({
  reducer: {
    clientForm: clientReducer,
    productForm: productReducer,
    transactionForm: transactionReducer,
    theme: themeReducer,
    auth: authReducer,
    signup: signupReducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      productsApi.middleware,
      transactionApi.middleware,
      analyticsApi.middleware,
      authApi.middleware
    ),
});

setupListeners(store.dispatch);
