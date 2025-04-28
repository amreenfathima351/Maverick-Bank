import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManageAccount from "./pages/ManageAccount";
import OpenAccount from "./pages/OpenAccount";
import ViewAccount from "./pages/ViewAccount";
import DepositFunds from "./pages/DepositFunds";
import WithdrawFunds from "./pages/WithdrawFunds";
import TransferFunds from "./pages/TransferFunds";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Update state if token exists
  }, []);
  return (
    <BrowserRouter>
      <NavigationBar
        isAuthenticated={isAuthenticated}
        setAuth={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/open-account" element={<OpenAccount />} />
        <Route path="/view-account" element={<ViewAccount />} />
        <Route path="/deposit" element={<DepositFunds />} />
        <Route path="/withdraw" element={<WithdrawFunds />} />
        <Route path="/transfer-funds" element={<TransferFunds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
