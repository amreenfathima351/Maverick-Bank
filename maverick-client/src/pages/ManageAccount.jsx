import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-3">Manage Account</h2>

          <Button
            variant="success"
            className="w-100 mb-2"
            onClick={() => navigate("/open-account")}
          >
            Open Account
          </Button>

          <Button
            variant="primary"
            className="w-100 mb-2"
            onClick={() => navigate("/view-account")}
          >
            View Account Details
          </Button>

          <Button
            variant="warning"
            className="w-100 mb-2"
            onClick={() => navigate("/deposit")}
          >
            Deposit
          </Button>

          <Button
            variant="danger"
            className="w-100 mb-2"
            onClick={() => navigate("/withdraw")}
          >
            Withdraw
          </Button>

          <Button
            variant="info"
            className="w-100"
            onClick={() => navigate("/transfer-funds")}
          >
            Transfer Funds
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageAccount;
