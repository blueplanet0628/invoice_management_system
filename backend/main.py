from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ✅ Add this import
from models import models
from database.database import engine
from api.routes import router
import uvicorn

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ Use specific origins in production like ["http://localhost:3000"]
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=9000, reload=True)
