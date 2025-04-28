from sqlalchemy import Column, Integer, String, Float, ForeignKey, BigInteger, DECIMAL
from sqlalchemy.orm import relationship
from database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    account_number = Column(BigInteger, unique=True, nullable=False)  # Remove default
    account_type = Column(String(50), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False, default=0.00)  # Ensure this exists

    # Relationship with User
    user = relationship("User", back_populates="accounts")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone_number = Column(String(15), nullable=False)

    # Relationship to Accounts
    accounts = relationship("Account", back_populates="user")