import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from 'axios'

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
  endpoints: (builder) =>({
    login: builder.mutation<MessageResponse,User>({query:(user)=>({
      url:"newUser",
      method:"POST",
      body:user,
    })
  }),
}),
});


  export const getUser = async (id: string) => {
    try {
      const {data}:{data:UserResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`);      
      return data
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err; 
    }
  };




export const {useLoginMutation} = userAPI;