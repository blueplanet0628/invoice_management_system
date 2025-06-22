from fastapi import APIRouter
from backend.models.models import Item

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong"}

@router.post("/items")
async def create_item(item: Item):
    return {"received": item}
