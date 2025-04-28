from random import randint

from fastapi import APIRouter, Depends, HTTPException
from utils.schemas import AccountCreate
from sqlalchemy.orm import Session
from models.models import User,Account
from database import get_db
import traceback  # Import traceback to print errors

router = APIRouter()

@router.post("/open_account")
def open_account(account_data: AccountCreate, db: Session = Depends(get_db)):
    try:
        print("Received Data:", account_data.dict())  # Print request data

        if not account_data.user_id:
            raise HTTPException(status_code=400, detail="User ID is required")

        # Generate unique account number
        while True:
            new_account_number = randint(1000000000, 9999999999)
            existing_account = db.query(Account).filter(Account.account_number == new_account_number).first()
            if not existing_account:
                break

        new_account = Account(
            user_id=account_data.user_id,
            account_number=new_account_number,
            account_type=account_data.account_type,
            amount=account_data.amount
        )

        db.add(new_account)
        db.commit()
        db.refresh(new_account)

        return {"message": "Account created successfully!", "account_number": new_account.account_number}

    except Exception as e:
        print("ERROR:", traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal Server Error")

# API to Get All Accounts of a User
@router.get("/account/{user_id}")
def get_accounts(user_id: int, db: Session = Depends(get_db)):
    accounts = db.query(Account).filter(Account.user_id == user_id).all()

    if not accounts:
        raise HTTPException(status_code=404, detail="No accounts found for this user")

    return {"user_id": user_id, "accounts": accounts}
