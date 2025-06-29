import { Apiservice } from "../ApiService";

const dashboardApi = Apiservice.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {useLazyGetOverviewQuery} = dashboardApi;
