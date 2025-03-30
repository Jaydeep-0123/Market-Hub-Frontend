import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react';
import { CategoryResponse, MessageResponse, NewProductRequest, ProductDetails, ProductResponse, SearchProductRequest, SearchProductResponse } from '../../types/api-types';

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
  endpoints: (builder) =>({
    latestProducts:builder.query<ProductResponse,string>({query:()=>"latest/product"}),
    allProducts:builder.query<ProductResponse,string>({query:(id)=>`all?id=${id}`}),
    categories:builder.query<CategoryResponse,string>({query:()=>"all/category"}),
    searchProducts:builder.query<SearchProductResponse,SearchProductRequest>({query:({price,search,category,sort,page})=>{
      let base=`search/product?search=${search}&page=${page}`;
      if(price) base+=`&price=${price}`;
      if(category) base+=`&category=${category}`;
      if(sort) base+=`&sort=${sort}`;
     
      return base;

    }}),
    newProduct:builder.mutation<MessageResponse,NewProductRequest>({query:({formData,id})=>({url:`newProduct?id=${id}`,method:"POST",body:formData})}),
    productsDetails:builder.query<ProductDetails,string>({query:(id)=>id})
  }),
});

export const {
        useLatestProductsQuery,
        useAllProductsQuery,
        useCategoriesQuery,
        useSearchProductsQuery,
        useNewProductMutation,
        useProductsDetailsQuery
      } = productAPI;