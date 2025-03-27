import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react';
import { ProductResponse } from '../../types/api-types';

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
  endpoints: (builder) =>({
    latestProducts:builder.query<ProductResponse,string>({query:()=>"latest/product"}),
    allProducts:builder.query<ProductResponse,string>({query:(id)=>`all?id=${id}`})
  }),
});

export const {useLatestProductsQuery,useAllProductsQuery} = productAPI;