import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewAccount = () => {
  const [userId, setUserId] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      handleViewAccount(storedUserId);
    } else {
      setMessage("User ID not found. Please log in.");
    }
  }, []);

  const handleViewAccount = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8300/account/${userId}`
      );
      setAccountDetails(response.data.accounts);
      setMessage("");
    } catch (error) {
      setMessage("No accounts found for this user.");
      setAccountDetails(null);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-3">Account Details</h2>
          {message && <Alert variant="info">{message}</Alert>}
          {accountDetails && accountDetails.length > 0
            ? accountDetails.map((account, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <p>
                    <strong>Account No:</strong> {account.account_number}
                  </p>
                  <p>
                    <strong>Type:</strong> {account.account_type}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${account.amount}
                  </p>
                </div>
              ))
            : null}
          <Button
            variant="secondary"
            className="w-100 mt-3"
            onClick={() => navigate("/manage-account")}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default ViewAccount;
