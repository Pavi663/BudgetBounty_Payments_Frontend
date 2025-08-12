import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaUniversity,
  FaMoneyCheckAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import "./TransfersPage.css";

function TransfersPage() {
  const navigate = useNavigate();

  const transferOptions = [
    {
      name: "UPI",
      path: "/upi",
      icon: <FaMobileAlt size={40} />,
      desc: "Instant money transfer via UPI ID",
      color: "#a855f7",
    },
    {
      name: "NEFT",
      path: "/neft",
      icon: <FaUniversity size={40} />,
      desc: "Secure interbank transfer (NEFT)",
      color: "#9333ea",
    },
    {
      name: "RTGS",
      path: "/rtgs",
      icon: <FaMoneyCheckAlt size={40} />,
      desc: "Real-time high-value transfers",
      color: "#7e22ce",
    },
    {
      name: "IMPS",
      path: "/imps",
      icon: <FaExchangeAlt size={40} />,
      desc: "Instant IMPS fund transfer",
      color: "#6b21a8",
    },
  ];

  // Dummy data for tables
  const latestTransfers = [
    { date: "2025-08-01", to: "John Doe", amount: "₹5,000", status: "Completed" },
    { date: "2025-08-02", to: "Jane Smith", amount: "₹2,000", status: "Pending" },
    { date: "2025-08-05", to: "Amit Kumar", amount: "₹10,000", status: "Completed" },
  ];

  const scheduledTransfers = [
    { date: "2025-08-15", to: "Priya Sharma", amount: "₹3,000", type: "NEFT" },
    { date: "2025-08-20", to: "Ravi Mehta", amount: "₹7,500", type: "UPI" },
  ];

  const savedRecipients = [
    { name: "John Doe", account: "XXXX1234", bank: "SBI" },
    { name: "Jane Smith", account: "XXXX5678", bank: "HDFC" },
    { name: "Amit Kumar", account: "XXXX9876", bank: "ICICI" },
  ];

  return (
    <div className="transfers-page">
      <h1 className="title">💸 Transfers</h1>

      {/* Transfer Cards */}
      <div className="card-grid">
        {transferOptions.map((option, index) => (
          <div
            key={index}
            className="transfer-card"
            style={{ background: option.color }}
            onClick={() => navigate(option.path)}
          >
            <div className="icon">{option.icon}</div>
            <h2>{option.name}</h2>
            <p>{option.desc}</p>
          </div>
        ))}
      </div>

      {/* Latest Transfers Table */}
      <div className="table-section">
        <h2>📄 Latest Transfers</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>To</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {latestTransfers.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td>{item.to}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scheduled Transfers Table */}
      <div className="table-section">
        <h2>📅 Scheduled Transfers</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>To</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {scheduledTransfers.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td>{item.to}</td>
                <td>{item.amount}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Saved Recipients Table */}
      <div className="table-section">
        <h2>📌 Saved Recipients</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account</th>
              <th>Bank</th>
            </tr>
          </thead>
          <tbody>
            {savedRecipients.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.account}</td>
                <td>{item.bank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransfersPage;
