import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  tagTypes: ["Supplier"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/inventory/" }),
  endpoints: (builder) => ({
    getPaginatedSupplier: builder.query({
      query: ({ page, limit }) =>
        `paginatedSuppliers?page=${page}&limit=${limit}`,
      // to fetch data again when make changes
      providesTags: ["Supplier", "Suppliers"],
    }),
    createSupplier: builder.mutation({
      query: (newSupplier) => ({
        url: "suppliers",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newSupplier,
      }),
      invalidatesTags: ["Supplier"],
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `paginatedSuppliers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supplier"],
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...updatedSupplier }) => ({
        url: `paginatedSuppliers/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedSupplier,
      }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useGetPaginatedSupplierQuery,
  useUpdateSupplierMutation,
} = supplierApi;
