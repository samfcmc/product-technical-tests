import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const boutiquesApi = createApi({
  reducerPath: "boutiques",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getNearbyBoutiques: builder.query({
      query: ({ latitude, longitude, limit }) =>
        `/boutiques?latitude=${latitude}&longitude=${longitude}&limit=${limit}`,
    }),
  }),
});

export const { useGetNearbyBoutiquesQuery } = boutiquesApi;
