import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransfersPage from "./Pages/Transfers/TransfersPage";
import UpiForm from "./Pages/Upi/UPITransferForm";
import NeftForm from "./Pages/neft/NEFTTransferForm";
import RtgsForm from "./Pages/rtgs/RTGSTransferForm";
import ImpsForm from "./Pages/imps/IMPSTransferForm";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(50000); // shared balance

  const updateBalance = (amount) => {
    setBalance((prev) => prev - amount);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TransfersPage balance={balance} />}
        />
        <Route
          path="/upi"
          element={<UpiForm balance={balance} updateBalance={updateBalance} />}
        />
        <Route
          path="/neft"
          element={<NeftForm balance={balance} updateBalance={updateBalance} />}
        />
        <Route
          path="/rtgs"
          element={<RtgsForm balance={balance} updateBalance={updateBalance} />}
        />
        <Route
          path="/imps"
          element={<ImpsForm balance={balance} updateBalance={updateBalance} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
