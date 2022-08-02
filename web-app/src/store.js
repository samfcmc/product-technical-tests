import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { boutiquesApi } from "./services/boutiques";

export const store = configureStore({
  reducer: {
    [boutiquesApi.reducerPath]: boutiquesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boutiquesApi.middleware),
});

setupListeners(store.dispatch);
