import { Apiservice } from "../ApiService";

const invoiceApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({



    getInvoices: builder.query({
      query: ({
        search = "",
        page = 1,
        perpage = 10,
        time = "",
        sort = "desc",
        status = 7,
      }) => ({
        url: `/invoice?search=${search}&page=${page}&perpage=${perpage}&date=${time}&sort=${sort}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["invoice"],
    }),

    InvoiceDetail: builder.query({
      query: (id) => ({
        url: `/invoice/${id}`,
        method: "GET",
      }),
      providesTags: ["invoice"],
    }),



    updateInvoice: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/invoice/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["invoice"],
    }),


    sendInvoice: builder.mutation({
      query: (orderId) => ({
        url: `/invoice/send-invoice`,
        method: "POST",
        body: orderId,
      }),
      invalidatesTags: ["invoice"],
    }),


    downloadInvoice: builder.mutation({
      query: (InvoiceId) => ({
        url: `/invoice/download-invoice`,
        method: "POST",
        body: { InvoiceId },
        responseHandler: async (response) => {
          return await response.blob();
        },
      }),

      invalidatesTags: ["invoice"],
    }),

    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/invoice/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoice"],
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
  useDeleteInvoiceMutation,
  useInvoiceDetailQuery,
  useUpdateInvoiceMutation,
  useSendInvoiceMutation,
  useDownloadInvoiceMutation,
} = invoiceApi;
