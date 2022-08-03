import { createSlice } from "@reduxjs/toolkit";

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: { locating: false, coordinates: {}, error: null },
  reducers: {
    geolocationSuccess: (state, action) => {
      const { payload } = action;
      const { latitude, longitude } = payload;
      return {
        ...state,
        locating: false,
        error: null,
        coordinates: {
          latitude,
          longitude,
        },
      };
    },
    geolocationFailed: (state, action) => {
      const { payload: error } = action;
      return {
        ...state,
        locating: false,
        error,
        coordinates: {},
      };
    },
    geolocationRequested: (state) => {
      return {
        ...state,
        locating: true,
        coordinates: {},
        error: null,
      };
    },
  },
});

export const { actions, reducer, name } = geolocationSlice;
