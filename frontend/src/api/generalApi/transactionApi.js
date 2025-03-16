import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transaction",
  tagTypes: ["Transactions"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/general/`,
  }),
  endpoints: (builder) => ({
    getPaginatedTransaction: builder.query({
      query: ({ page, limit }) =>
        `paginatedTransaction?page=${page}&limit=${limit}`,
      providesTags: ["Transactions"],
    }),
    getAllTransactions: builder.query({
      query: () => "transactions",
      providesTags: ["Transactions"],
    }),
    createTransaction: builder.mutation({
      query: (transactionData) => ({
        url: "paginatedTransaction",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: transactionData,
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `paginatedTransaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...updatedTransaction }) => ({
        url: `paginatedTransaction/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedTransaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetPaginatedTransactionQuery,
  useGetAllTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = transactionApi;
