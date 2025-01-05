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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "admin-login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "admin-signup",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: () => "admins",
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetProfileQuery } =
  authApi;
