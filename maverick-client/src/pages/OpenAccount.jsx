import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OpenAccount = () => {
  const [accountType, setAccountType] = useState("Savings");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setMessage("User ID not found. Please log in.");
    }
  }, []);

  const handleOpenAccount = async () => {
    const requestData = {
      user_id: parseInt(userId, 10),
      account_type: accountType.trim(),
      amount: parseFloat(amount) || 0,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8300/open_account",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(
        `Account created successfully! Account No: ${response.data.account_number}`
      );
      setAccountType("Savings");
      setAmount("");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Failed to open account.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-3">Open Account</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" value={userId} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Savings">Savings</option>
                <option value="Checking">Checking</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Initial Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>
            <Button
              variant="success"
              className="w-100 mb-2"
              onClick={handleOpenAccount}
            >
              Open Account
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
export default OpenAccount;
