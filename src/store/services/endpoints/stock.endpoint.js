import { Apiservice } from "../ApiService";

const stockApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    getStocks: builder.query({
      query: ({
        search = "",
        page = 1,
        perpage = 20,
        time = "",
        sort = "desc",
        branch = null,
        priceRange = null,
        onlyInStock = null,
        rating = null,
        discount = null,
        categories = null,
      }) => {
        const priceParam = Array.isArray(priceRange)
          ? priceRange.join("-")
          : priceRange;
        return {
          url: `/stocks?search=${search}&page=${page}&perpage=${perpage}&onlyInStock=${onlyInStock}&rating=${rating}&discount=${discount}&time=${time}&sort=${sort}&priceRange=${priceParam}`,
          method: "GET",
        };
      },
      providesTags: ["stocks"],
    }),

    detailStock: builder.query({
      query: (id) => ({
        url: `/stocks/${id}`,
        method: "GET",
      }),
      providesTags: ["stocks"],
    }),

    exportStock: builder.query({
      query: () => ({
        url: "/stocks/export",
        method: "GET",
        responseHandler: async (response) => {
          return response.blob();
        },
      }),

      serializeQueryArgs: () => null,
      transformResponse: (response) => response,
    }),

    createStock: builder.mutation({
      query: (formData) => ({
        url: "/stocks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["stocks"],
    }),

    importStock: builder.mutation({
      query: (file) => ({
        url: "/stocks/import",
        method: "POST",
        body: file,
        headers: {},
      }),
      invalidatesTags: ["stocks"],
    }),

    updateStock: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/stocks/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["stocks"],
    }),

    deleteStock: builder.mutation({
      query: (id) => ({
        url: `/stocks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stocks"],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useCreateStockMutation,
  useDeleteStockMutation,
  useUpdateStockMutation,
  useDetailStockQuery,
  useImportStockMutation,
  useLazyExportStockQuery,
} = stockApi;
