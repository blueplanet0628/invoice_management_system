from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://root:@localhost:3306/todo_db"

engine = create_engine(DATABASE_URL, echo=True)  # echo=True はSQLログ出力用（任意）

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# DBセッションを取得してyieldする関数
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
