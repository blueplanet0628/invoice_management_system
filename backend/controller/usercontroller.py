from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models.models import User
from schema.schemas import UserCreate, UserLogin
import time
from utils.security import hash_password, verify_password
from fastapi import Depends
from database.database import get_db 

reset_tokens = {}

def create_user(db: Session, user: UserCreate):

    # Optional: Check if email exists too
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")
    # check agree
    if user.agree == False:
        raise HTTPException(status_code=400, detail="You must agree to the terms and conditions")
    
    hashed_pw = hash_password(user.password)


    new_user = User(
        representative=user.representative,
        department=user.department,
        company=user.company,  
        postalCode=user.postalCode,  
        address=user.address, 
        building=user.building,
        email=user.email,  
        phone=user.phone,  
        password=hashed_pw, 
        created_at=int(time.time()),
        updated_at=int(time.time()),
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create user due to DB constraint")


def login_user_logic(user: UserLogin, db: Session):
    print("Received login data:", user.email)

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return db_user


def read_users(db: Session):
    return db.query(User).all()
