import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../css/upi.css";

function UPITransferForm() {
  const { register, handleSubmit, formState, reset, watch, trigger, getValues } = useForm();
  const upiId = watch("upiId");
  const confirmUpiId = watch("confirmUpiId");

  useEffect(() => {
    if (confirmUpiId) trigger("confirmUpiId");
  }, [upiId, confirmUpiId, trigger]);

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    alert("UPI Transfer initiated!");
  };

  return (
    <div className="upi-hero">
    <div className="upi-container">
      {/* Header OUTSIDE form */}
      <div className="upi-header">
        <h2>UPI Transfer</h2>
        <span className="balance"><span>Your Balance&nbsp;:&nbsp;&nbsp;</span><span className="balance-amt">Rs 24,321,900</span></span>
      </div>

      {/* Form container */}
      <div className="upi-container">
        <form className="upi-form" onSubmit={handleSubmit(onSubmit)}>
          
          <input
            type="text"
            placeholder="UPI ID (e.g., username@bank)"
            className="form-field"
            {...register("upiId", {
              required: "UPI ID is required",
              validate: (v) => {
                if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(v))
                  return "Invalid UPI format (e.g., name@bank)";
                return true;
              },
            })}
          />
          {formState.errors.upiId && (
            <div className="error-text">{formState.errors.upiId.message}</div>
          )}

          <input
            type="text"
            placeholder="Confirm UPI ID"
            className="form-field"
            {...register("confirmUpiId", {
              required: "Confirming UPI ID is required",
              validate: (v) => {
                if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(v))
                  return "Invalid UPI format";
                if (v !== getValues("upiId"))
                  return "UPI ID does not match";
                return true;
              },
            })}
          />
          {formState.errors.confirmUpiId && (
            <div className="error-text">{formState.errors.confirmUpiId.message}</div>
          )}

          <input
            type="text"
            placeholder="Beneficiary Name"
            className="form-field"
            {...register("beneficiaryName", {
              required: "Beneficiary Name is required",
            })}
          />
          {formState.errors.beneficiaryName && (
            <div className="error-text">{formState.errors.beneficiaryName.message}</div>
          )}

          <div className="amount-label">Amount</div>
          <div className="amount-input">
            <span>Rs</span>
            <input
              type="number"
              placeholder="0"
              {...register("amount", {
                required: "Please enter amount to be transferred",
                min: { value: 1, message: "Minimum amount is Rs 1" },
              })}
            />
          </div>
          {formState.errors.amount && (
            <div className="error-text" style={{ marginBottom: "10px" }}>
              {formState.errors.amount.message}
            </div>
          )}

          <input
            type="text"
            placeholder="Note (Optional)"
            className="note-input"
            {...register("note")}
          />

          <button
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Processing..." : "Proceed to Transfer"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default UPITransferForm;