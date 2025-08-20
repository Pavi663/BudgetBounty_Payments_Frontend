import React, { useState, useEffect } from "react";
import "../css/rtgs.css";
import { useNavigate } from "react-router-dom";

function RTGSTransferForm() {
  const navigator = useNavigate();
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    senderAccountId: "A001",
    accountNumber: "",
    cnfaccountNumber: "",
    ifscCode: "",
    beneficiaryName: "",
    amount: "",
    note: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    // Mirror RHF setValueAs for IFSC: uppercase + remove spaces while typing
    const nextValue =
      name === "ifscCode"
        ? (value ?? "").toUpperCase().replace(/\s/g, "")
        : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  const validateForm = () => {
    const newErrors = {};

    // --- Account Number (required -> digits only -> length 12)
    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account Number is required";
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Only digits allowed";
    } else if (formData.accountNumber.length !== 12) {
      newErrors.accountNumber = "Enter exactly 12 digits";
    }

    // --- Confirm Account Number (required -> digits only -> length 12 -> match)
    if (!formData.cnfaccountNumber) {
      newErrors.cnfaccountNumber = "Account Number is required";
    } else if (!/^\d+$/.test(formData.cnfaccountNumber)) {
      newErrors.cnfaccountNumber = "Only digits allowed";
    } else if (formData.cnfaccountNumber.length !== 12) {
      newErrors.cnfaccountNumber = "Enter exactly 12 digits";
    } else if (formData.cnfaccountNumber !== formData.accountNumber) {
      newErrors.cnfaccountNumber = "Not same as Account Number";
    }

    // --- IFSC (required -> length 11 -> regex ^[A-Z]{4}0[A-Z0-9]{6}$)
    const ifsc = (formData.ifscCode ?? "").toUpperCase().replace(/\s/g, "");
    if (!ifsc) {
      newErrors.ifscCode = "IFSC Code is required";
    } else if (ifsc.length !== 11) {
      newErrors.ifscCode = "IFSC must be 11 characters";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      newErrors.ifscCode = "Invalid IFSC format (e.g., SBIN0001234)";
    }

    // --- Beneficiary Name (required)
    if (!formData.beneficiaryName || !formData.beneficiaryName.trim()) {
      newErrors.beneficiaryName = "Beneficiary Name is required";
    }

    // --- Amount (required -> >= 1)
    if (formData.amount === "" || formData.amount === null) {
      newErrors.amount = "Please enter amount to be transferred";
    } else if (isNaN(formData.amount) || Number(formData.amount) < 1) {
      newErrors.amount = "Amount must be at least 1";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  // Validate on any field change
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Revalidate confirm ONLY after user has typed in it (matches your RHF effect)
  useEffect(() => {
    if (formData.cnfaccountNumber) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.accountNumber, formData.cnfaccountNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const payload = {
        ...formData,
        ifscCode: (formData.ifscCode ?? "").toUpperCase().replace(/\s/g, ""),
        amount: Number(formData.amount),
      };

      console.log("Sending JSON:", JSON.stringify(payload));

      const res = await fetch("http://localhost:8081/payment/type=rtgs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const message = await res.text();
        setMsg(message);
        navigator("/payment/processing");
      } else {
        const text = await res.text();
        setMsg("Server error: " + text);
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg("An error occurred while submitting.");
    }
  };

  return (
    <div className="rtgs-hero">
      <div className="rtgs-container">
        <div className="rtgs-header">
          <h2>RTGS Transfer</h2>
          <span className="balance">
            <span>Your Balance&nbsp;:&nbsp;&nbsp;</span>
            <span className="balance-amt">Rs 24,321,900</span>
          </span>
        </div>

        <form className="rtgs-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="accountNumber"
            inputMode="numeric"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Account Number"
            className="form-field"
            value={formData.accountNumber}
          />
          {touched.accountNumber && errors.accountNumber && (
            <p className="error">{errors.accountNumber}</p>
          )}

          <input
            type="password"
            name="cnfaccountNumber"
            inputMode="numeric"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm Account Number"
            className="form-field"
            value={formData.cnfaccountNumber}
          />
          {touched.cnfaccountNumber && errors.cnfaccountNumber && (
            <p className="error">{errors.cnfaccountNumber}</p>
          )}

          <input
            type="text"
            name="ifscCode"
            placeholder="IFSC Code"
            className="form-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.ifscCode}
          />
          {touched.ifscCode && errors.ifscCode && (
            <p className="error">{errors.ifscCode}</p>
          )}

          <input
            type="text"
            name="beneficiaryName"
            placeholder="Beneficiary Name"
            className="form-field"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.beneficiaryName}
          />
          {touched.beneficiaryName && errors.beneficiaryName && (
            <p className="error">{errors.beneficiaryName}</p>
          )}

          <div className="amount-label">Amount</div>
          <div className="amount-input">
            <span>Rs</span>
            <input
              type="number"
              name="amount"
              min="1"
              placeholder="0"
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.amount}
            />
          </div>
          {touched.amount && errors.amount && (
            <p className="error">{errors.amount}</p>
          )}

          <input
            type="text"
            name="note"
            placeholder="Note (Optional)"
            className="note-input"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.note}
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className={`submit-btn ${isFormValid ? "active" : "disabled"}`}
          >
            {isFormValid ? "Proceed to Transfer" : "Proceed to Transfer"}
          </button>
        </form>

        {msg && <div className="message">{msg}</div>}
      </div>
    </div>
  );
}

export default RTGSTransferForm;