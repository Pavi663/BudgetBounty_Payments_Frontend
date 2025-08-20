import React, { useEffect, useState } from "react";
 import "../css/Home.css"
import { useNavigate } from "react-router-dom";

// const latestTransfers = [
//   {
//     name: "Alexandria",
//     img: "https://randomuser.me/api/portraits/women/65.jpg",
//     date: "May 31, 2025 09:13",
//     amount: "Rp 600,000",
//     type: "avatar"
//   },
//   {
//     name: "Immanuel",
//     img: "https://randomuser.me/api/portraits/men/23.jpg",
//     date: "May 13, 2023, 21.54",
//     amount: "Rp 200,000",
//     type: "avatar"
//   },
//   {
//     name: "Maybank – Alexa",
//     img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Maybank_logo.svg",
//     date: "April 27, 2025 20:29",
//     amount: "Rp 745,000",
//     type: "bank"
//   },
//   {
//     name: "Kayshania",
//     img: "https://randomuser.me/api/portraits/women/50.jpg",
//     date: "April 27, 2025 20.29",
//     amount: "Rp 7,000",
//     type: "avatar"
//   },
//   {
//     name: "BRI – Akhmad.",
//     img: "https://upload.wikimedia.org/wikipedia/id/8/8e/Bank_Rakyat_Indonesia.png",
//     date: "April 12, 2025 04:18",
//     amount: "Rp 450,000",
//     type: "bank"
//   },
//   {
//     name: "Ibrahim",
//     img: "https://randomuser.me/api/portraits/men/36.jpg",
//     date: "April 11, 2025 16:01",
//     amount: "Rp 550,000",
//     type: "avatar"
//   }
// ];

const tabs = [
  {
    key: "upi",
    label: "UPI",
    icon: (
      <svg width="24" height="24" fill="none" stroke="#682dbd" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="2.9"/>
        <circle cx="12" cy="19" r="1.4" />
      </svg>
    )
  },
  {
    key: "neft",
    label: "NEFT",
    icon: (
      <svg width="23" height="23" fill="none" stroke="#682dbd" strokeWidth="2.05" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3,9 12,3 21,9" />
        <rect x="5.5" y="9" width="13" height="7.8" rx="1.3"/>
        <line x1="3" y1="16.8" x2="21" y2="16.8"/>
      </svg>
    )
  },
  {
    key: "rtgs",
    label: "RTGS",
    icon: (
      <svg width="23" height="23" fill="none" stroke="#682dbd" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 13 10 13 2"/>
      </svg>
    )
  },
  {
    key: "imps",
    label: "IMPS",
    icon: (
      <svg width="23" height="23" fill="none" stroke="#682dbd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4,12 9,7 14,12"/>
        <polyline points="9,7 9,19"/>
        <polyline points="19,11 14,16 9,11"/>
        <polyline points="14,16 14,4"/>
      </svg>
    )
  }
];

export default function TransferHome() {
  const [tab, setTab] = useState("upi");
  const [latestTransfers, setLatestTransfers] = useState([]);
  const navigate = useNavigate();

  const userId="001";

    useEffect(() => {
      fetch(`${API_BASE}/api/transactions/txns/${userId}`)
      .then(res => res.json())
      .then(data => setLatestTransfers(data))
      .catch(err => console.error("Failed to fetch transfers:", err));
  }, [userId]);

  const handleTab = (t) => {
    setTab(t.key);
    switch (t.key) {
      case "upi": navigate("/upi"); break;
      case "neft": navigate("/type=neft"); break;
      case "rtgs": navigate("/payment/type=rtgs"); break;
      case "imps": navigate("/type=imps"); break;
      default: break;
    }
  };

  return (
    <div className="transferpage-root">
      <div className="transferpage-purple-top">
        <div className="transfer-heading">TRANSFERS</div>
        <div className="transfer-tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`transfer-tab${tab === t.key ? " selected" : ""}`}
              onClick={() => handleTab(t)}
            >
              <span className="tab-icon" style={{marginBottom: '2px'}}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="transferpage-content">
        <div className="transfer-box">
          <div className="section-title" style={{ marginBottom: 16, marginTop: 12 }}>Latest Transfers</div>
          <div className="transfer-table">
            <div className="transfer-table-header">
              <span>Recipient</span>
              <span>Date</span>
              <span>Amount</span>
            </div>
            {/* {latestTransfers.map((t, idx) => (
              <div key={idx} className="transfer-row">
                <span className="recipient">
                  <img
                    className={t.type === "bank" ? "mini-bank" : "mini-avatar"}
                    src={t.img}
                    alt={t.name}
                  />
                  {t.name}
                </span>
                <span>{t.date}</span>
                <span className="amt">{t.amount}</span>
              </div>
            ))} */}
            {latestTransfers.map((t, idx) => (
              <div key={t.txnId || idx} className="transfer-row">
                <span className="recipient">
                  <img
                    className="mini-avatar"
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png" 
                    alt="recipient"
                  />
                  {t.recipient}
                </span>
                <span>{formatDate(t.date)}</span>
                <span className="amt">{formatINR(t.amount)}</span>
              </div>
            ))}
          </div>

          <div className="section-row">
            <div className="section-title sec">Scheduled Transfers</div>
            <span className="section-caption">No scheduled transfers</span>
          </div>
          <div className="section-row">
            <div className="section-title sec">Saved Recipients</div>
            <span className="section-caption">No saved recipients</span>
          </div>
          <div className="secured-note">
            Secured by end-to-end encryption
          </div>
        </div>
      </div>
    </div>
  );
}
