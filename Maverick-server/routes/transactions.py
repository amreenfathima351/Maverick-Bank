from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.models import Account
from utils.schemas import DepositRequest, WithdrawRequest, TransferRequest
from decimal import Decimal

router = APIRouter()


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/deposit")
def deposit_funds(request: DepositRequest, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.account_number == request.account_number).first()

    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    if request.deposit_amount <= 0:
        raise HTTPException(status_code=400, detail="Deposit amount must be greater than zero")

    deposit_amount = Decimal(request.deposit_amount)

    account.amount += deposit_amount
    db.commit()
    db.refresh(account)

    return {"message": "Deposit successful", "new_balance": float(account.amount)}

@router.post("/withdraw")
def withdraw_funds(request: WithdrawRequest, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.account_number == request.account_number).first()

    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    if request.withdraw_amount <= 0:
        raise HTTPException(status_code=400, detail="Withdrawal amount must be greater than zero")

    if Decimal(str(request.withdraw_amount)) > account.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")

    # Deduct balance
    account.amount -= Decimal(str(request.withdraw_amount))
    db.commit()

    return {"message": "Withdrawal successful", "new_balance": float(account.amount)}

@router.post("/transfer")
def transfer_funds(request: TransferRequest, db: Session = Depends(get_db)):
    from_account = db.query(Account).filter(Account.account_number == request.from_account).first()
    to_account = db.query(Account).filter(Account.account_number == request.to_account).first()

    if not from_account:
        raise HTTPException(status_code=404, detail="Sender account not found")
    if not to_account:
        raise HTTPException(status_code=404, detail="Receiver account not found")

    if from_account.amount < Decimal(str(request.transfer_amount)):
        raise HTTPException(status_code=400, detail="Insufficient balance")

    from_account.amount -= Decimal(str(request.transfer_amount))
    to_account.amount += Decimal(str(request.transfer_amount))

    db.commit()

    return {"message": "Transfer successful", "new_balance": float(from_account.amount)}