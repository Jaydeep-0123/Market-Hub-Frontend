import React, { FormEvent, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51QyVG22cosWct8vHrBpHTVBew6CzSIlCExbyPe7RJeAbBnvsiCTv1x3N0g4oABou4UzECXwPsVz3IeGJXIdxOpa800fzTV26BI"
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

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
      console.log("Placing Order");
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
