import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";

const token = localStorage.getItem("token");

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["User"],
});
