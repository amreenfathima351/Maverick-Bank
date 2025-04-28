from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models.models as models
import utils.schemas as schemas
import utils.hash as hash
from database import get_db
import jwt  # Import JWT library
import datetime

SECRET_KEY = "493aafb3d82b0309881cc4d7738e6cbabdf31f8e7c6f13d857fb4bb4b836e74c"  # Change this to a secure secret
ALGORITHM = "HS256"

router = APIRouter()

@router.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = hash.hash_password(user.password)

    # Create new user
    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        phone_number=user.phone_number
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify password
    if not hash.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Generate JWT token
    token_data = {
        "sub": db_user.email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": token, "user_id": int(db_user.id)}  # ✅ Corrected
