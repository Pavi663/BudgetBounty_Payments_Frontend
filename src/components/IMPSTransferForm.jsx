import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/imps.css";

function IMPSTransferForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/processing");
  };

  return (
    <div className="imps-hero">
      <div className="imps-container">
        <div className="imps-header">
          <h2>IMPS Transfer</h2>
          <span className="balance">
            <span>Your Balance&nbsp;:&nbsp;&nbsp;</span>
            <span className="balance-amt">Rs 24,321,900</span>
          </span>
        </div>

        {/* Just a static (frontend-only) IMPS UI form */}
        <form className="imps-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Account Number"
            className="form-field"
            disabled
            value="123456789012"
          />
          <input
            type="text"
            placeholder="Confirm Account Number"
            className="form-field"
            disabled
            value="123456789012"
          />
          <input
            type="text"
            placeholder="IFSC Code"
            className="form-field"
            disabled
            value="SBIN0001234"
          />
          <input
            type="text"
            placeholder="Beneficiary Name"
            className="form-field"
            disabled
            value="Amit Kumar"
          />
          <div className="amount-label">Amount</div>
          <div className="amount-input">
            <span>Rs</span>
            <input
              type="number"
              placeholder="0"
              disabled
              value="8500"
            />
          </div>
          <input
            type="text"
            placeholder="Note (Optional)"
            className="note-input"
            disabled
            value="Payment for invoice #324"
          />

          <button type="submit">
            Proceed to Transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default IMPSTransferForm;
