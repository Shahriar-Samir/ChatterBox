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
        url: `/conversations/allUserConversations/${uid}`,
        method: "GET",
      }),
    }),
    getConversationMessages: builder.mutation({
      query: (cid) => ({
        url: `/messages/${cid}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ messageData, receiverId }) => ({
        url: `/messages?receiverId=${receiverId}`,
        method: "POST",
        body: messageData,
      }),
    }),
    removeMessageFromAll: builder.mutation({
      query: (MId) => ({
        url: `/messages/removeForAll/${MId}`,
        method: "DELETE",
      }),
    }),
    removeMessageFromYou: builder.mutation({
      query: (MId) => ({
        url: `/messages/removeForSender/${MId}`,
        method: "DELETE",
      }),
    }),
    search: builder.mutation({
      query: (params) => ({
        url: `/search?searchTerm=${params.searchTerm}&uid=${params.uid}`,
        method: "GET",
      }),
    }),
    startConversation: builder.mutation({
      query: (credentials) => ({
        url: `/conversations`,
        method: "POST",
        body: credentials,
      }),
    }),
    updateMidOfConversation: builder.mutation({
      query: (params) => ({
        url: `/conversations/updateMIdOfConversation?CID=${params.CID}&MId=${params.MId}&receiverId=${params.receiverId}`,
        method: "PATCH",
      }),
    }),
    getSingleConversation: builder.mutation({
      query: (CId) => ({
        url: `/conversations/singleConversation/${CId}`,
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
  useSendMessageMutation,
  useRemoveMessageFromAllMutation,
  useRemoveMessageFromYouMutation,
  useSearchMutation,
  useStartConversationMutation,
  useGetSingleConversationMutation,
  useUpdateMidOfConversationMutation,
} = chatterBoxApi;
