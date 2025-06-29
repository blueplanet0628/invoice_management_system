from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controller import crud, usercontroller
# from controller.usercontroller import request_password_reset, confirm_password_reset
from schema import schemas
from database.database import get_db  
# from schema.schemas import PasswordResetRequest, PasswordResetConfirm


from schema.schemas import PasswordResetRequest, PasswordResetConfirm
from utils.utils import create_reset_token, verify_reset_token
from utils.email_utils import send_reset_email
from models.models import User
from passlib.hash import bcrypt


router = APIRouter()

@router.post("/todos", response_model=schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db, todo)

@router.get("/todos", response_model=list[schemas.TodoResponse])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_all_todos(db)

@router.get("/todos/{todo_id}", response_model=schemas.TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = crud.get_todo(db, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.put("/todos/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_id: int, todo: schemas.TodoUpdate, db: Session = Depends(get_db)):
    updated = crud.update_todo(db, todo_id, todo)
    if not updated:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    success = crud.delete_todo(db, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Deleted"}

@router.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return usercontroller.create_user(db, user)

@router.post("/login", response_model=schemas.LoginResponse)
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    return usercontroller.login_user_logic(user, db)


@router.get("/users/{user_id}", response_model=list[schemas.UserResponse])
def read_users(db: Session = Depends(get_db)):
    return usercontroller.get_user(db)


@router.post("/password-reset/request")
def request_reset(data: PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if user:
        token = create_reset_token(user.email)
        print(token,'token')
        send_reset_email(user.email, token)
    return {"msg": "If the email exists, a reset link has been sent."}

@router.post("/password-reset/confirm")
def confirm_reset(data: PasswordResetConfirm, db: Session = Depends(get_db)):
    email = verify_reset_token(data.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.hashed_password = bcrypt.hash(data.new_password)
        db.commit()
        return {"msg": "Password reset successful"}
    raise HTTPException(status_code=404, detail="User not found")
