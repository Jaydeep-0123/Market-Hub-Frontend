import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartReducerInitialState } from '../../types/reducer-types';
import { CartItem,SippingInfo } from '../../types/types';

const initialState:CartReducerInitialState={
    loading:false,
    cartItems:[],
    subtotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    total:0,
    shippingInfo:{
        address:"",
        city:"",
        country:"",
        state:"",
        pincode:"",
    }

};

export const cartReducer=createSlice({
    name:"cartReducer",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItem>)=>{
            state.loading=true;

            const index=state.cartItems.findIndex((i)=>i.productId===action.payload.productId)
           if(index!==-1)
            state.cartItems[index]=action.payload;
          else
          
            state.cartItems.push(action.payload);
            state.loading=false;
        },
        removeCartItem:(state,action:PayloadAction<string>)=>{
            state.loading=true;
           state.cartItems= state.cartItems.filter(i=>i.productId!==action.payload);
            state.loading=false;
        
        },
        calculatePrice:(state)=>{
           let subTotal=0;
           for(let i=0;i<state.cartItems.length;i++)
           {
             const item=state.cartItems[i];
             subTotal+=item.price*item.quantity;
           }
           state.subtotal=subTotal;
           state.shippingCharges=state.subtotal>1000?0:200;
           state.tax=Math.round(state.subtotal*0.18);
           state.total=(state.subtotal+state.tax+state.shippingCharges)-state.discount;
        },
        discountApplied:(state,action:PayloadAction<number>)=>{
           state.discount=action.payload;
        },
        saveShippingInfo:(state,action:PayloadAction<SippingInfo>)=>{
           state.shippingInfo=action.payload;
        },
        resetCart:()=>initialState

    },
})

export const {
            addToCart,
            removeCartItem,
            calculatePrice,
            discountApplied,
            saveShippingInfo,
            resetCart
        } = cartReducer.actions;