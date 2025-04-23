import React, { FormEvent, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NewOrderRequest } from "../types/api-types";
import { useDispatch, useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();
  const disPatch=useDispatch();

  const {user}=useSelector((state:RootState)=>state.userReducer);
  const {shippingInfo,cartItems,subtotal,tax,discount,shippingCharges,total}=useSelector((state:RootState)=>state.cartReducer);
  
  const [isProcessing, setIsProcessing] = useState(false);

  const [newOrder]=useNewOrderMutation();

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

   
    const orderData:NewOrderRequest={
      shippingInfo,
      orderItems:cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      userId:user?._id??""
    }

    const {paymentIntent,error} = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });
    if(error)
    {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }
    if(paymentIntent.status==="succeeded")
    {

      const res=await newOrder(orderData);
      disPatch(resetCart());
      console.log(res);
      navigate("/orders");
      
    }
    setIsProcessing(false);
  }

  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>{isProcessing ? "Processing..." : "Pay"}</button>
      </form>
    </div>
  );
}

function Checkout() {
  const location=useLocation();
  const clientSecret:string|undefined=location.state;
  if(!clientSecret)
    return <Navigate to={"/shipping"}/>

  return (
    <Elements
      options={{
        clientSecret:
          "pi_3RCd4m2cosWct8vH14wTsKJH_secret_XLYCoASIxU6a37AZUIIoIaNlc",
      }}
      stripe={stripePromise}
    >
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
