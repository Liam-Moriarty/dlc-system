import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import clientReducer from "../features/formState/clientSlice";
import productReducer from "../features/formState/productSlice";
import themeReducer from "../features/theme/themeSlice";

import { clientApi } from "../api/generalApi/clientApi";
import { productsApi } from "../api/generalApi/productsApi";

export const store = configureStore({
  reducer: {
    clientForm: clientReducer,
    productForm: productReducer,
    theme: themeReducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientApi.middleware, productsApi.middleware),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ["yourApiEndpoint/fulfilled"], // Ignore non-serializable actions
  //       ignoredPaths: ["productsApi.uploadedFile"],
  //     },
  //   }).concat(clientApi.middleware, productsApi.middleware),
});

setupListeners(store.dispatch);
