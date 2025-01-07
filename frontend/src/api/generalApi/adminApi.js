import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "admin",
  tagTypes: ["Admins"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/general/" }),
  endpoints: (builder) => ({
    paginatedAdmins: builder.query({
      query: ({ page, limit }) => `admins?page=${page}&limit=${limit}`,
      providesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const { usePaginatedAdminsQuery, useDeleteAdminMutation } = adminApi;
