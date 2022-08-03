import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { boutiquesApi } from "./services/boutiques";
import {
  reducer as geolocationReducer,
  name as geolocationName,
} from "./slices/geolocation";

export const store = configureStore({
  reducer: {
    [boutiquesApi.reducerPath]: boutiquesApi.reducer,
    [geolocationName]: geolocationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boutiquesApi.middleware),
});

setupListeners(store.dispatch);
