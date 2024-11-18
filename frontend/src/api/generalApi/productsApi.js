import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ["Products", "Unique Products", "Unique Clients"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/general/" }),
  endpoints: (builder) => ({
    getPaginatedProduct: builder.query({
      query: ({ page, limit }) =>
        `paginatedProducts?page=${page}&limit=${limit}`,
      providesTags: ["Products", "Product"],
    }),
    getUniqueProducts: builder.query({
      query: () => "uniqueProducts",
      providesTags: ["Unique Products"],
    }),
    getUniqueClients: builder.query({
      query: () => "uniqueClients",
      providesTags: ["Unique Clients"],
    }),
    getAllProducts: builder.query({
      query: () => "products",
      providesTags: ["Products"],
    }),
    addProducts: builder.mutation({
      query: (formData) => ({
        url: "products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProducts: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `products/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetPaginatedProductQuery,
  useGetUniqueProductsQuery,
  useGetUniqueClientsQuery,
  useGetAllProductsQuery,
  useAddProductsMutation,
  useDeleteProductsMutation,
  useUpdateProductsMutation,
} = productsApi;
