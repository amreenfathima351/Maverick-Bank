import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const DepositFunds = () => {
  const [userId, setUserId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");
  const [accountDetails, setAccountDetails] = useState([]);

  const navigate = useNavigate(); // Initialize navigate

  // Retrieve user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchAccounts(storedUserId);
    } else {
      setMessage("User ID not found. Please log in.");
    }
  }, []);

  // Fetch user's accounts
  const fetchAccounts = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8300/account/${userId}`
      );
      setAccountDetails(response.data.accounts);
    } catch (error) {
      setMessage("No accounts found for this user.");
    }
  };

  // Handle Deposit
  const handleDeposit = async () => {
    const requestData = {
      account_number: parseInt(accountNumber, 10),
      deposit_amount: parseFloat(depositAmount),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8300/deposit",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(
        `Deposit Successful! New Balance: $${response.data.new_balance}`
      );
      setDepositAmount("");

      setTimeout(() => {
        navigate("/manage-account");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to deposit funds.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-3">Deposit Funds</h2>

          {message && <Alert variant="info">{message}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" value={userId} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Account</Form.Label>
              <Form.Select
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              >
                <option value="">Select an account</option>
                {accountDetails.map((account) => (
                  <option
                    key={account.account_number}
                    value={account.account_number}
                  >
                    {account.account_number} - {account.account_type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deposit Amount</Form.Label>
              <Form.Control
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>

            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={handleDeposit}
            >
              Deposit
            </Button>
            <Button
              variant="secondary"
              className="w-100"
              onClick={() => navigate("/manage-account")}
            >
              Back
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DepositFunds;
