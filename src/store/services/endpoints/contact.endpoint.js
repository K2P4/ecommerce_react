import { Apiservice } from "../ApiService";

const ContactApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (formData) => ({
        url: "/contact/send-message",
        method: "POST",
        body: formData,
        headers: {},
      }),
      invalidatesTags: ["contact"],
    }),

    getContacts: builder.query({
      query: () => ({
        url: "/contact/index",
        method: "GET",
        headers: {},
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useLazyGetContactsQuery,
} = ContactApi;
