import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/general/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Access token from Redux state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const adminApi = createApi({
  reducerPath: "admin",
  tagTypes: ["Admins"],
  baseQuery,
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
    updateProfile: builder.mutation({
      query: (updatedProfile) => ({
        url: "updateProfile",
        method: "PUT",
        body: updatedProfile,
      }),
    }),
    changePassword: builder.mutation({
      query: (updatedPassword) => ({
        url: "changePassword",
        method: "PUT",
        body: updatedPassword,
      }),
    }),
  }),
});

export const {
  usePaginatedAdminsQuery,
  useDeleteAdminMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = adminApi;
