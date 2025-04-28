from fastapi import FastAPI
from database import engine, Base
from routes import users
from routes import account
from routes import transactions
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(account.router)
app.include_router(transactions.router)

@app.get("/")
def home():
    return {"message": "Maverick Bank API is running!"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8300)