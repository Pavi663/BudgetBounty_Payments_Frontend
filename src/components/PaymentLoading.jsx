// PaymentLoading.js
import React, { useEffect } from "react";
import "../css/PaymentLoading.css";
import AdsCarousel from "./AdsCarousel";
import { useNavigate } from "react-router-dom";

function PaymentLoading() {
  const navigate=useNavigate();
  useEffect(()=>{
    const interval=setInterval(
      async()=>{
        const res=await fetch("http://localhost:8080/payment/processing")
        const data=await res.json()
        if (data.done){
          clearInterval(interval);
          if (data.success){
            navigate("/payment/success")

          }
          else navigate("/pagenotfoud")
        }
      },2000)
  },[navigate])
  return (
    <div className="payment-loading-bg">
      <div className="payment-card loading">
        <div className="success-check">
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-text">Payment Initiated</div>
        <div className="desc">Please wait, processing your payment...</div>

        {/* Advertisement Section */}
        <div className="ad-banner">
          {/* Example: Could be an image, text, or external ad component */}
          <AdsCarousel/>
          {/* Or use a rotating array of ad messages */}
          {/* <span>Special offer! Get 10% off your next transfer.</span> */}
        </div>

        <div className="progress-bar stripes">
          <div className="progress-animated"/>
        </div>
      </div>
    </div>
  );
}

export default PaymentLoading;