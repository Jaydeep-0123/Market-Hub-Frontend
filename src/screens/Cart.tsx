import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import CartItems from "../components/CartItems";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import axios from "axios";
function Cart()
{
  const {cartItems,subtotal,tax,total,shippingCharges,discount}=useSelector((state:{cartReducer:CartReducerInitialState})=>state.cartReducer);
     
    const disPatch=useDispatch();
    const [couponCode,setCouponCode]=useState("");
    const [isValidCouponCode,setIsValidCouponCode]=useState(false);
  
    const incrementHandler = (cartItem:CartItem)=>
    {
      if(cartItem.quantity>=cartItem.stock)
        return;
      disPatch(addToCart({...cartItem,quantity:cartItem.quantity+1}))
    }
    
    
    const decrementHandler=(cartItem:CartItem)=>
    {
     disPatch(addToCart({...cartItem,quantity:cartItem.quantity-1}))

    }

   const removeHandler=(id:string)=>
   {
      disPatch(removeCartItem(id))
   }


    useEffect(()=>{
      const {token:cancelToken,cancel}=axios.CancelToken.source()
    const timeOutId = setTimeout(()=>{
      axios.get(`http://localhost:8000/api/v1/payment/discount?coupon_Code=${couponCode}`,{
        cancelToken,
      })
      .then((response)=>{
        disPatch(discountApplied(response.data.discount))
        setIsValidCouponCode(true);
        disPatch(calculatePrice());
        
      })
      .catch(()=>{
        disPatch(discountApplied(0));
        setIsValidCouponCode(false);
        disPatch(calculatePrice());
      })
       
     },1000);

     return ()=>{
        clearTimeout(timeOutId);
        cancel();
        setIsValidCouponCode(false)
     };
    },[couponCode])

    useEffect(()=>{
       disPatch(calculatePrice());
    },[cartItems])
    
    return <div className="cart">
      <main>
        {
         cartItems.length>0? cartItems.map((i,index)=>(
            <CartItems cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler} key={index}/>
          )):(
            <h1>No Item Added</h1>
          )
        }
       
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
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