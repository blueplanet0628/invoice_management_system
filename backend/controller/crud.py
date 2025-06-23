from sqlalchemy.orm import Session
from models import models  # keep this if your model file is models/models.py
from schema.schemas import TodoCreate, TodoUpdate

def create_todo(db: Session, todo: TodoCreate):
    new_todo = models.Todo(title=todo.title, description=todo.description)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

def get_all_todos(db: Session):
    return db.query(models.Todo).all()

def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

def update_todo(db: Session, todo_id: int, todo_data: TodoUpdate):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo:
        todo.title = todo_data.title
        todo.description = todo_data.description
        # todo.completed = todo_data.completed
        db.commit()
        db.refresh(todo)
    return todo

def delete_todo(db: Session, todo_id: int):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo:
        db.delete(todo)
        db.commit()
        return True
    return False
