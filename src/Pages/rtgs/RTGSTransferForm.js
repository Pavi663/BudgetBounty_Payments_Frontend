import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./rtgs.css";

function RTGSTransferForm() {
  const { register, handleSubmit, formState, reset, watch, trigger, getValues } = useForm();
  const account = watch("accountNumber");
  const confirm = watch("confirmAccountNumber");

// Revalidate confirm ONLY after user has typed in it
useEffect(() => {
  if (confirm) trigger("confirmAccountNumber");
}, [account, confirm, trigger]);

  const onSubmit = async(data) => {
    console.log(data);

        // Simulate an API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clear all fields
    reset();

    alert("Transfer initiated!");
  };

  return (
    <div className="rtgs-hero">
    <div className="rtgs-container">
      <div className="rtgs-header">
        <h2>RTGS Transfer</h2>
        <span className="balance"><span>Your Balance&nbsp;:&nbsp;&nbsp;</span><span className="balance-amt">Rs 24,321,900</span></span>
      </div>

      <form className="rtgs-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Account Number"
          className="form-field"
          {...register("accountNumber", {
            required: "Account Number is required",
            validate: (v) => {
              if (!/^\d+$/.test(v)) return "Only digits allowed";
              if (v.length !== 12) return "Enter exactly 12 digits";
              return true;
            },
          })}
        />
        {formState.errors.accountNumber && (
          <div className="error-text">{formState.errors.accountNumber.message}</div>
        )}
        <input
          type="text"
          placeholder="Confirm Account Number"
          className="form-field"
          {...register("confirmAccountNumber", {
            required: "Account Number is required",
            validate: (v) => {
              if (!/^\d+$/.test(v)) return "Only digits allowed";
              if (v.length !== 12) return "Enter exactly 12 digits";
              if (v !== getValues("accountNumber")) return "Not same as Account Number";
              return true;
            },
          })}
        />
        {formState.errors.confirmAccountNumber && (
          <div className="error-text">{formState.errors.confirmAccountNumber.message}</div>
        )}
        <input
          type="text"
          placeholder="IFSC Code"
          className="form-field"
          {...register("ifscCode", { 
                required: "IFSC Code is required",
                setValueAs: (v) => (v ?? "").toUpperCase().replace(/\s/g, ""),
                validate: (v) => {
                  if (v.length !== 11) return "IFSC must be 11 characters";
                  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(v)) return "Invalid IFSC format (e.g., SBIN0001234)";
                  return true;
                },
           })}
        />
        {formState.errors.ifscCode && (
           <div className="error-text">{formState.errors.ifscCode.message}</div>
        )}
        <input
          type="text"
          placeholder="Beneficiary Name"
          className="form-field"
          {...register("beneficiaryName", { required: "Beneficiary Name is required" })}
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
            {...register("amount", { required: "Please enter amount to be transfered", min: 1 })}
          />
        </div>
        {formState.errors.amount && (
           <div className="error-text" style={{marginBottom: "10px"}}>{formState.errors.amount.message}</div>
        )}
        <input
          type="text"
          placeholder="Note (Optional)"
          className="note-input"
          {...register("note")}
        />

        <button type="submit" disabled={formState.isSubmitting}>{formState.isSubmitting ? "Processing..." : "Proceed to Transfer"}</button>
      </form>
    </div>
    </div>
  );
}

export default RTGSTransferForm;