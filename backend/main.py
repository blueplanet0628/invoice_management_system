from fastapi import FastAPI
from models import models
from database.database import engine
from api.routes import router  # あなたのルーターのパスに合わせてください

# テーブル作成
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ルーター登録
app.include_router(router)
