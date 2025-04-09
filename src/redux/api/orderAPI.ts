import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, MyOrderResponse, NewOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes:["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({ url: "newOrder", method: "POST", body: order }),
      invalidatesTags:["orders"],
    }),

    myOrders:builder.query<MyOrderResponse,string>({
        query:(id)=>`myOrders?id=${id}`,
        providesTags: [{ type: 'orders', id: 'LIST' }],
    }),
    allOrders:builder.query<AllOrdersResponse,string>({
        query:(id)=>(`allOrders?id=${id}`),
        providesTags:["orders"]
    }),



  }),
});

export const { useNewOrderMutation , } = orderApi;
