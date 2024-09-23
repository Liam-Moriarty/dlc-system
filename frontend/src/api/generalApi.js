import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const generalApi = createApi({
  reducerPath: "generalApi",
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
      invalidatesTags: ["Client"],
    }),
  }),
});

export const { useCreateClientMutation, useGetPaginatedClientsQuery } =
  generalApi;