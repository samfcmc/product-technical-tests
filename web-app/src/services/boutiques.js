import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const { useGetAllBoutiquesQuery } = boutiquesApi;
