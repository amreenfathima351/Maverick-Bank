Maverick Bank

Overview
Maverick Bank is a full-stack banking application that allows users to register, log in, manage accounts, and perform financial transactions such as deposits, withdrawals, and transfers. The application consists of a React frontend for the user interface and a FastAPI backend to handle business logic and database interactions.

Features
- User Registration & Login: Users can register and log in to their accounts securely with token-based authentication.
- Account Management: Users can open new accounts, view account details, and manage their information.
- Financial Transactions: Users can deposit funds, withdraw funds, and transfer money between accounts.
- Routing & Navigation: The React app uses React Router for navigation between pages.

Technologies Used
- Frontend: React, React Router
- Backend: FastAPI, Python
- Authentication: Token-based authentication using localStorage
- Database: SQLAlchemy for ORM (database setup and configuration are assumed to be done on your local environment)
- CORS: Configured to allow the React frontend to interact with the FastAPI backend

Setup Instructions

Backend (FastAPI)
1. Clone the repository:
   git clone https://github.com/amreenfathima351/Maverick-Bank.git
   cd Maverick-Bank/backend

2. Install required dependencies:
   pip install -r requirements.txt

3. Run the FastAPI server:
   uvicorn main:app --reload

   The backend will be running at http://127.0.0.1:8300.

Frontend (React)
1. Navigate to the frontend directory:
   cd frontend

2. Install the required dependencies:
   npm install

3. Start the React development server:
   npm start

   The frontend will be accessible at http://localhost:3000.

API Endpoints
- POST /register: Register a new user.
- POST /login: Log in to the system and receive a token.
- GET /account/{user_id}: Retrieve account details for a given user.
- POST /account/open: Open a new bank account.
- POST /account/deposit: Deposit funds into an account.
- POST /account/withdraw: Withdraw funds from an account.
- POST /account/transfer: Transfer funds between accounts.

Contributing
Feel free to fork the repository and submit issues or pull requests. Contributions are welcome!

License
This project is licensed under the MIT License.
