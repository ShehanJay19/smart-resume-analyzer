from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File
)

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User

from app.schemas.resume import (
    ResumeResponse
)

from app.services.resume_service import (
    save_resume
)

router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"]
)

@router.post(
    "/upload",
    response_model=ResumeResponse
)
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    return save_resume(
        file,
        current_user.id,
        db
    )