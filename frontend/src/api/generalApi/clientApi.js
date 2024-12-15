import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  reducerPath: "clientApi",
  tagTypes: ["Clients"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/general/" }),
  endpoints: (builder) => ({
    getPaginatedClients: builder.query({
      query: ({ page, limit }) =>
        `paginatedClients?page=${page}&limit=${limit}`,
      // to fetch data again when make changes
      providesTags: ["Clients", "Client"],
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "paginatedClients",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `paginatedClients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: ({ id, ...updatedClient }) => ({
        url: `paginatedClients/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedClient,
      }),
      invalidatesTags: ["Clients"],
    }),
    getAllClients: builder.query({
      query: () => "clients",
      providesTags: ["Clients"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetPaginatedClientsQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
  useGetAllClientsQuery,
} = clientApi;
