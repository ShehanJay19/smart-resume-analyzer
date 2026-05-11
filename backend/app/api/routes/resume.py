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

from app.schemas.jd import JDRequest

from app.ai.jd_matcher import (
    match_resume_to_jd
)

from app.ai.resume_parser import (
    extract_resume_text
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
 
@router.post("/match")
def match_resume(
    request: JDRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    latest_resume = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).order_by(
        Resume.id.desc()
    ).first()

    if not latest_resume:
        return {
            "detail": "No resume found"
        }

    resume_text = extract_resume_text(
        latest_resume.file_path
    )

    result = match_resume_to_jd(
        resume_text,
        request.job_description
    )

    return result    