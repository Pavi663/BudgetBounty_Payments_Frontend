import React from "react";

const styles = {
  container: {
    background: "#4b2999",
    minHeight: "100vh",
    fontFamily: "sans-serif",
    padding: "40px 0",
    position: "relative"
  },
  statusCard: {
    background: "#fff",
    borderRadius: "18px",
    width: "480px",
    margin: "40px auto",
    padding: "32px",
    boxShadow: "0 2px 14px 0 rgba(54, 16, 113, 0.08)"
  },
  header: {
    fontSize: "2rem",
    color: "#fff"
  },
  balance: {
    position: "absolute",
    top: "48px",
    right: "64px",
    fontSize: "1rem",
    color: "#fff"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  bankLogo: {
    height: "32px",
    marginRight: "6px",
    verticalAlign: "middle"
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "3px",
    flex: 1
  },
  userTitle: {
    fontWeight: "600",
    fontSize: "1.18rem"
  },
  account: {
    color: "#909090",
    fontSize: "1rem"
  },
  amount: {
    marginLeft: "auto",
    fontWeight: "bold",
    fontSize: "1.4rem",
    color: "#000"
  },
  steps: {
    display: "flex",
    alignItems: "center",
    margin: "28px 0"
  },
  step: (active) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    color: active ? "#4b2999" : "#bbb",
    fontWeight: active ? "bold" : "normal"
  }),
  line: {
    height: "3px",
    background: "#4b2999",
    flex: 1,
    margin: "0 6px"
  },
  circle: (active, completed) => ({
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: completed ? "#bbb" : active ? "#4b2999" : "#fff",
    border: `2px solid ${active || completed ? "#4b2999" : "#bbb"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "5px"
  }),
  table: {
    width: "100%",
    marginTop: "12px",
    fontSize: "0.97rem",
    borderCollapse: "collapse"
  },
  row: {
    height: "36px"
  },
  cellTitle: {
    color: "#909090"
  },
  cellValue: {
    fontWeight: "bold"
  }
};

const transactionSteps = [
  { label: "Initiated" },
  { label: "Sender Bank" },
  { label: "Receiver Bank" },
  { label: "Completed" }
];

// Mask for 12-digit accounts: XXXXXXXX1234
function maskAccountNumber(account) {
  // Remove non-digits
  const digits = account.replace(/\D/g, "");
  if (digits.length === 12) {
    return "XXXXXXXX" + digits.slice(-4);
  }
  // For other lengths, mask all but last 4
  const maskLength = digits.length > 4 ? digits.length - 4 : 0;
  return "X".repeat(maskLength) + digits.slice(-4);
}

function TransactionStatus() {
  const activeStep = 2;
  const accountNumber = "123456789012"; // use your actual account number here
  const maskedAccount = maskAccountNumber(accountNumber);

  return (
    <div style={styles.container}>
      <div style={styles.header}>Transaction Status</div>
      <div style={styles.balance}>Your Balance <b>Rs 12,018.87</b></div>
      <div style={styles.statusCard}>
        <div style={styles.userSection}>
          {/* Bank logo added here */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/21/Bank_Central_Asia_logo.svg"
            alt="BCA"
            style={styles.bankLogo}
          />
          <div style={styles.userDetails}>
            <span style={styles.userTitle}>Karolina McMillan</span>
            <span style={styles.account}>{maskedAccount}</span>
          </div>
          <span style={styles.amount}>Rs 745.000</span>
        </div>
        <div style={styles.steps}>
          {transactionSteps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div style={styles.step(idx <= activeStep)}>
                <div style={styles.circle(idx <= activeStep, idx === 3)}>
                  {idx === 3 || idx <= activeStep ? <span>&#10003;</span> : ""}
                </div>
                <span>{step.label}</span>
              </div>
              {idx < transactionSteps.length - 1 && (
                <div
                  style={{
                    ...styles.line,
                    background: idx < activeStep ? "#4b2999" : "#eee"
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <table style={styles.table}>
          <tbody>
            <tr style={styles.row}>
              <td style={styles.cellTitle}>Payment Type</td>
              <td style={styles.cellValue}>RTGS</td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.cellTitle}>Date</td>
              <td style={styles.cellValue}>June 9, 2023</td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.cellTitle}>Time</td>
              <td style={styles.cellValue}>12.30</td>
            </tr>
            <tr style={styles.row}>
              <td style={styles.cellTitle}>Fee</td>
              <td style={styles.cellValue}>Rs 5.50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionStatus;
