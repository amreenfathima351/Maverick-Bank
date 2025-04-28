import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const TransferFunds = () => {
  const [userId, setUserId] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [message, setMessage] = useState("");
  const [accountDetails, setAccountDetails] = useState([]);

  const navigate = useNavigate();

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

  // Handle Transfer
  const handleTransfer = async () => {
    const requestData = {
      from_account: parseInt(fromAccount, 10),
      to_account: parseInt(toAccount, 10),
      transfer_amount: parseFloat(transferAmount),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8300/transfer",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(
        `Transfer Successful! New Balance: ₹${response.data.new_balance}`
      );
      setTransferAmount("");

      // Redirect to Manage Account after 2 seconds
      setTimeout(() => {
        navigate("/manage-account");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to transfer funds.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "26rem" }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-3">Transfer Funds</h2>

          {message && <Alert variant="info">{message}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" value={userId} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>From Account</Form.Label>
              <Form.Select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
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
              <Form.Label>To Account (Enter Account Number)</Form.Label>
              <Form.Control
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                placeholder="Enter recipient's account number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transfer Amount</Form.Label>
              <Form.Control
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-2"
              onClick={handleTransfer}
            >
              Transfer
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

export default TransferFunds;
