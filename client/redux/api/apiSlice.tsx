import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API service
export const chatterBoxApi = createApi({
  reducerPath: "chatterBoxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    auth: builder.mutation({
      query: () => ({
        url: "/auth/userAuth",
        method: "POST",
        body: {},
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "POST",
        body: credentials,
      }),
    }),
    getUserConversations: builder.mutation({
      query: (uid) => ({
        url: `/conversations/${uid}`,
        method: "GET",
      }),
    }),
    getConversationMessages: builder.mutation({
      query: (cid) => ({
        url: `/messages/${cid}`,
        method: "GET",
      }),
    }),
  }),
});

// Export all hooks
export const {
  useLoginMutation,
  useSignupMutation,
  useAuthMutation,
  useLogoutMutation,
  useGetUserConversationsMutation,
  useGetConversationMessagesMutation,
} = chatterBoxApi;
