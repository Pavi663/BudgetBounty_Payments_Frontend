import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/neft.css";

function NEFTTransferForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent actual (re)load
    navigate("/processing");
  };

  return (
    <div className="neft-hero">
      <div className="neft-container">
        <div className="neft-header">
          <h2>NEFT Transfer</h2>
          <span className="balance">
            <span>Your Balance&nbsp;:&nbsp;&nbsp;</span>
            <span className="balance-amt">Rs 24,321,900</span>
          </span>
        </div>

        <form className="neft-form" onSubmit={handleSubmit}>
          <input type="text" className="form-field" placeholder="Account Number" disabled value="123456789012" />
          <input type="text" className="form-field" placeholder="Confirm Account Number" disabled value="123456789012" />
          <input type="text" className="form-field" placeholder="IFSC Code" disabled value="SBIN0001234" />
          <input type="text" className="form-field" placeholder="Beneficiary Name" disabled value="Amit Kumar" />
          <div className="amount-label">Amount</div>
          <div className="amount-input">
            <span>Rs</span>
            <input type="number" placeholder="0" disabled value="15000" />
          </div>
          <input type="text" className="note-input" placeholder="Note (Optional)" disabled value="Invoice #456 payment" />

          <button type="submit">Proceed to Transfer</button>
        </form>
      </div>
    </div>
  );
}

export default NEFTTransferForm;
