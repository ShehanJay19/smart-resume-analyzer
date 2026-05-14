from fastapi import FastAPI
from app.db.database import Base, engine
from app.models.user import User

from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router
from app.models.resume import Resume
from app.api.routes.resume import router as resume_router
from app.ai.vector_store import (
    load_jobs
)
from app.models.chat import ChatMessage


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Resume Analyzer API",
    version="1.0.0"
)
load_jobs()
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(resume_router)

@app.get("/")
def root():
    return {
        "message": "API Running Successfully"
    }