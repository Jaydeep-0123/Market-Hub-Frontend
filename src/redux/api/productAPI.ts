import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
  endpoints: (builder) =>({
    latestProducts:builder.query({query:()=>"latest/product"})
  }),
});