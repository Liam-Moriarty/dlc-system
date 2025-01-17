import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movementApi = createApi({
  reducerPath: "movementApi",
  tagTypes: ["Movement"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/inventory/" }),
  endpoints: (builder) => ({
    getPaginatedMovement: builder.query({
      query: ({ page, limit }) =>
        `paginatedMovement?page=${page}&limit=${limit}`,
      // to fetch data again when make changes
      providesTags: ["Movement", "Movements"],
    }),
    createMovement: builder.mutation({
      query: (newMovement) => ({
        url: "movement",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newMovement,
      }),
      invalidatesTags: ["Movement"],
    }),
    deleteMovement: builder.mutation({
      query: (id) => ({
        url: `paginatedMovement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movement"],
    }),
    updateMovement: builder.mutation({
      query: ({ id, ...updatedMovement }) => ({
        url: `paginatedMovement/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedMovement,
      }),
      invalidatesTags: ["Movement"],
    }),
    getAllSuppliers: builder.query({
      query: () => "suppliers",
      providesTags: ["Movement"],
    }),
    getAllAggregatedProducts: builder.query({
      query: () => "aggregatedProducts",
      providesTags: ["Movement"],
    }),
  }),
});

export const {
  useCreateMovementMutation,
  useDeleteMovementMutation,
  useGetPaginatedMovementQuery,
  useUpdateMovementMutation,
  useGetAllSuppliersQuery,
  useGetAllAggregatedProductsQuery,
} = movementApi;
