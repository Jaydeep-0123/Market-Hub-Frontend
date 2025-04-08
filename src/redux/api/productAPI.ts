import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react';
import { CategoryResponse, DeleteProductRequest, DeleteProductResponse, MessageResponse, NewProductRequest, ProductDetails, ProductResponse, ProductUpdateResponse, SearchProductRequest, SearchProductResponse, UpdateProductRequest } from '../../types/api-types';

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ["Product"], // ✅ Important for cache invalidation
  endpoints: (builder) => ({

    // 🔍 Get latest products
    latestProducts: builder.query<ProductResponse, string>({
      query: () => "latest/product",
      providesTags: ["Product"], // ✅ Ensures cache tracking
    }),

    // 🔍 Get all products (with userId)
    allProducts: builder.query<ProductResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["Product"], // ✅ Refetch after update/delete
    }),

    // 🔍 Get all categories
    categories: builder.query<CategoryResponse, string>({
      query: () => "all/category",
      // No need to tag unless categories are dynamically updated
    }),

    // 🔍 Search products
    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
      query: ({ price, search, category, sort, page }) => {
        let base = `search/product?search=${search}&page=${page}`;
        if (price) base += `&price=${price}`;
        if (category) base += `&category=${category}`;
        if (sort) base += `&sort=${sort}`;
        return base;
      },
      providesTags: ["Product"], // ✅ Useful if search shows updated products
    }),

    // 🆕 Create new product
    newProduct: builder.mutation<MessageResponse, NewProductRequest>({
      query: ({ formData, id }) => ({
        url: `newProduct?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // ✅ Refetch list after new product
    }),

    // 🔍 Get product details
    productsDetails: builder.query<ProductDetails, string>({
      query: (id) => id,
      providesTags: ["Product"], // ✅ In case detail is updated
    }),

    // ✏️ Update product
    updateProduct: builder.mutation<ProductUpdateResponse, UpdateProductRequest>({
      query: ({ formData, userId, productId }) => ({
        url: `update/product/${productId}?id=${userId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"], // ✅ Invalidate cache so list & detail update
    }),

    // ❌ Delete product
    deleteProduct: builder.mutation<DeleteProductResponse, DeleteProductRequest>({
      query: ({ productId, userId }) => ({
        url: `delete/${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"], // ✅ So deleted product is removed from cache
    }),

  }),
});


export const {
        useLatestProductsQuery,
        useAllProductsQuery,
        useCategoriesQuery,
        useSearchProductsQuery,
        useNewProductMutation,
        useProductsDetailsQuery,
        useDeleteProductMutation,
        useUpdateProductMutation
      } = productAPI;