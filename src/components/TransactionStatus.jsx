import React, { useEffect, useState } from "react";

const transactionSteps = [
  { label: "Initiated" },
  { label: "Sender Bank" },
  { label: "Receiver Bank" },
  { label: "Completed" }
];

function maskAccountNumber(account) {
  const digits = account.replace(/\D/g, "");
  if (digits.length === 12) {
    return "XXXXXXXX" + digits.slice(-4);
  }
  const maskLength = digits.length > 4 ? digits.length - 4 : 0;
  return "X".repeat(maskLength) + digits.slice(-4);
}

function TransactionStatus() {
  const [activeStep, setActiveStep] = useState(0);
  const accountNumber = "123456789012";
  const maskedAccount = maskAccountNumber(accountNumber);

  useEffect(() => {
    if (activeStep < transactionSteps.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  const styles = {
    container: {
      background: "#4b2999",
      minHeight: "100vh",
      width: "100vw",
      fontFamily: "sans-serif",
      padding: "40px 0",
      position: "relative",

          // full-bleed theme background
    background:
      `radial-gradient(940px 940px at 110% -10%,
        transparent 58%, rgba(255,255,255,0.12) 59%, rgba(255,255,255,0.12) 63%, transparent 64%),
       radial-gradient(620px 620px at 98% 2%,
        transparent 60%, rgba(255,255,255,0.09) 61%, rgba(255,255,255,0.09) 66%, transparent 67%),
       radial-gradient(880px 880px at -12% 112%,
        transparent 58%, rgba(255,255,255,0.12) 59%, rgba(255,255,255,0.12) 63%, transparent 64%),
       radial-gradient(520px 520px at 2% 102%,
        transparent 60%, rgba(255,255,255,0.09) 61%, rgba(255,255,255,0.09) 66%, transparent 67%),
       radial-gradient(260px 260px at 70% 32%, rgba(255,255,255,0.06), transparent 70%),
       radial-gradient(200px 200px at 35% 45%, rgba(255,255,255,0.05), transparent 75%),
       linear-gradient(135deg, #6f2dbd 0%, #5b21b6 45%, #4c1d95 100%)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed"
    },
    statusCard: {
      background: "#fff",
      borderRadius: "18px",
      width: "1000px",
      margin: "40px auto",
      padding: "32px",
      boxShadow: "0 4px 18px rgba(54, 16, 113, 0.08)",
      position: "relative",
      transition: "box-shadow 0.6s ease"
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
      color: "#fff",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      justifyContent:"space-around"
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
      fontSize: "1rem",
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
      fontWeight: active ? "bold" : "normal",
      transition: "color 0.4s ease"
    }),
    lineWrapper: {
      flex: 1,
      margin: "0 6px",
      height: "3px",
      background: "#eee",
      overflow: "hidden",
      borderRadius: "2px"
    },
    lineFill: (filled) => ({
      height: "100%",
      width: filled ? "100%" : "0%",
      background: "#4b2999",
      transition: "width 0.8s ease"
    }),
    circle: (active, completed) => ({
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: completed ? "#00b300" : active ? "#4b2999" : "#fff",
      border: `2px solid ${completed ? "#00b300" : active ? "#4b2999" : "#bbb"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
      marginBottom: "5px",
      transform: completed ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease"
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

  return (
    <div style={styles.container}>
      <div style={styles.header}>Transaction Status</div>
      <div style={styles.balance}>
        Your Balance <b>Rs 12,018.87</b>
      </div>
      <div style={styles.statusCard}>
        <div style={styles.userSection}>
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
                <div
                  style={styles.circle(
                    idx === activeStep,
                    idx < activeStep || idx === activeStep
                  )}
                >
                  {idx <= activeStep && <span>✔</span>}
                </div>
                <span>{step.label}</span>
              </div>
              {idx < transactionSteps.length - 1 && (
                <div style={styles.lineWrapper}>
                  <div style={styles.lineFill(idx < activeStep)}></div>
                </div>
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