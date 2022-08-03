import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import haversine from "haversine-distance";

// meters
const DEFAULT_RADIUS = 50000;

export const boutiquesApi = createApi({
  reducerPath: "boutiques",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllBoutiques: builder.query({
      query: () => `/boutiques`,
      transformResponse: ({ boutiques = [] }) => boutiques,
    }),
  }),
});

export const { useGetNearbyBoutiquesQuery, useGetAllBoutiquesQuery } =
  boutiquesApi;
