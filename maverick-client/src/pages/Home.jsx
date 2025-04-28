import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to BankApp</h1>
      <p>Your secure banking platform for easy transactions.</p>
      <Button variant="primary" as={Link} to="/login">
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
