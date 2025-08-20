import React from 'react';
import '../css/success.css';
import { useNavigate } from 'react-router-dom';
function TransactionSuccess() {
  const navigator=useNavigate();
  return (
    <div className="container">
      <div className="card">
        <div className="success-check">
          <span>&#10004;</span>
        </div>
        <div className="status">
          <div className="success-text">Transfer Successful</div>
          <div className="desc">Your transaction was successful</div>
        </div>
        <div className="amount">Rp 760.000</div>
        <div className="payee">
          <img src="Data\assets\images.jpeg" height={20} style={{ marginRight: '8px' }} />
          <div className="payee-details">
            <div className="name">Munikarthik Vemula</div>
            <div className="acc">***** 80901</div>
          </div>
        </div>
        <div className="txn-details">
          <div className="row">
            <span>Payment Type</span>
            <span>UPI</span>
          </div>
          <div className="row">
            <span>Payment</span>
            <span>Rp 760.000</span>
          </div>
          <div className="row">
            <span>Date</span>
            <span>August 14,2025</span>
          </div>
          <div className="row">
            <span>Reference Number</span>
            <span>ALKS-9928-HGJID.2124</span>
          </div>
          <div className="row">
            <span>Fee</span>
            <span>Rp 2.500</span>
          </div>
        </div>
        <div className="total-payment">
          <span>Total Payment</span>
          <span>Rp 762.500</span>
        </div>
        <div className="button-row">
          <button className="share">Share</button>
        </div>
        <div className="back-home">
          <button onClick={()=>navigator("/home")}>Back to Home</button>
        </div>
        
      </div>
    </div>
  );
}

export default TransactionSuccess;
