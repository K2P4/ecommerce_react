import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Apiservice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://perfume-ecommerce-api.onrender.com/api",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["stocks", "category", "auth","order","delivery" , "client" , "invoice" , "contact" , "dashboard"],
  endpoints: (builder) => ({}),
});
