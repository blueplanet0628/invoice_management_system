from sqlalchemy import Column, Integer, String, Boolean
from database.database import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    description = Column(String(250))
    completed = Column(Boolean, default=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    representative = Column(String(50))
    company = Column(String(100))
    department = Column(String(100))  # ハッシュ化されたパスワードを保存することを想定
    postalCode = Column(String(20))
    address = Column(String(250))
    building = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    phone = Column(String(20))
    password = Column(String(100))  # ハッシュ化されたパスワードを保存することを想定
    created_at = Column(Integer)
    updated_at = Column(Integer)  
    deleted_at = Column(Integer, nullable=True)  # 削除日時（論理削除用）
