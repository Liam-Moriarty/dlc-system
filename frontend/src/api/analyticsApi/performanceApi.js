import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/analytics/`,
  }),
  endpoints: (builder) => ({
    getTopPerformingProducts: builder.query({
      query: () => "top-products",
    }),
    getLeastPerformingProducts: builder.query({
      query: () => "least-products",
    }),
    createDynamicDates: builder.mutation({
      query: (daterange) => ({
        url: "daily-sales",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: daterange,
      }),
    }),
    getWeeksStats: builder.query({
      query: () => "week-sales",
    }),
    getMonthsStats: builder.query({
      query: () => "month-sales",
    }),
    getStatusRevenue: builder.query({
      query: () => "status-revenue",
    }),
    getStatusCount: builder.query({
      query: () => "status-count",
    }),
    getSalesToday: builder.query({
      query: () => "sales-today",
    }),
    getClientCount: builder.query({
      query: () => "client-count",
    }),
  }),
});

export const {
  useGetTopPerformingProductsQuery,
  useGetLeastPerformingProductsQuery,
  useCreateDynamicDatesMutation,
  useGetWeeksStatsQuery,
  useGetMonthsStatsQuery,
  useGetStatusRevenueQuery,
  useGetStatusCountQuery,
  useGetSalesTodayQuery,
  useGetClientCountQuery,
} = analyticsApi;
