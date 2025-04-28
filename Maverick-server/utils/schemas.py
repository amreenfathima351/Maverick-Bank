from pydantic import BaseModel, EmailStr, condecimal


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone_number: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    user_id: int  # Ensure this is an integer

class AccountCreate(BaseModel):
    user_id: int
    account_type: str
    amount: float

class DepositRequest(BaseModel):
    account_number: int
    deposit_amount: float

class WithdrawRequest(BaseModel):
    account_number: int
    withdraw_amount: float

class TransferRequest(BaseModel):
    from_account: int
    to_account: int
    transfer_amount: condecimal(gt=0)  # Ensures positive transfer amount
