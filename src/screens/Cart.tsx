import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/CartItems";
import {Link} from 'react-router-dom';
function Cart()
{
    const [couponCode,setCouponCode]=useState("");
    const [isValidCouponCode,setIsValidCouponCode]=useState(false);
    const subTotal=4000;
    const cartItems=[
        {
            productId:"21221",
            photo:"https://m.media-amazon.com/images/I/71jG+e7roXL._SL1500_.jpg",
            name:"macbook",
            price:3000,
            quantity:4,
            stock:10

        },
    ];
    const tax=Math.round(subTotal*0.18);
    const shipingCharges=200;
    const discount=400;
    const total=subTotal+tax+shipingCharges;

    useEffect(()=>{
    const timeOutId = setTimeout(()=>{
       if(Math.random()>0.5) setIsValidCouponCode(true);
        else setIsValidCouponCode(false);
     },1000);

     return ()=>{
        clearTimeout(timeOutId);
        setIsValidCouponCode(false)
     };
    },[couponCode])
    return <div className="cart">
      <main>
        {
         cartItems.length>0? cartItems.map((i,index)=>(
            <CartItems cartItem={i} key={index}/>
          )):(
            <h1>No Item Added</h1>
          )
        }
       
      </main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shipingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
           Discount: <em> - ₹{discount}</em>
        </p>
        <p>
            <b>Total: ₹{total}</b>
        </p>
        <input type="text" value={couponCode} placeholder="Coupon Code" onChange={(e)=>{setCouponCode(e.target.value)}}/>
        {
            couponCode&&(
                isValidCouponCode?
            <span className="green">₹{discount} off using the <code>{couponCode}</code></span>
            :<span className="red">Invalid Coupon Code <VscError/></span>
            )
        }

        {
            cartItems.length>0&&<Link to="/shipping">CHECKOUT</Link>
        }

      </aside>
    </div>
}

export default Cart;