import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, DeleteOrderResponse, MessageResponse, MyOrderResponse, NewOrderRequest, SingleOrderResponse, UpdateOrderRequest, UpdateOrderResponse } from "../../types/api-types";

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

    updateOrder: builder.mutation<UpdateOrderResponse, UpdateOrderRequest>({
      query: ({userId,orderId}) => ({ url: `orderProcess/${orderId}?id=${userId}`, method: "PUT",}),
      invalidatesTags:["orders"],
    }),

    deleteOrder: builder.mutation<DeleteOrderResponse, UpdateOrderRequest>({
      query: ({userId,orderId}) => ({ url: `deleteOrder/${orderId}?id=${userId}`, method: "DELETE",}),
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
    singleOrders:builder.query<SingleOrderResponse,string>({
      query:(id)=>(`singleOrders/${id}`),
      providesTags:["orders"]
    })



  }),
});

export const { 
          useNewOrderMutation,
          useDeleteOrderMutation,
          useAllOrdersQuery,
          useSingleOrdersQuery,
          useMyOrdersQuery,
          useUpdateOrderMutation} = orderApi;
