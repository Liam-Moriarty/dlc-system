import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import clientReducer from "../features/formState/clientSlice";
import themeReducer from "../features/theme/themeSlice";
import { generalApi } from "../api/generalApi";

export const store = configureStore({
  reducer: {
    clientForm: clientReducer,
    theme: themeReducer,
    [generalApi.reducerPath]: generalApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware),
});

setupListeners(store.dispatch);
