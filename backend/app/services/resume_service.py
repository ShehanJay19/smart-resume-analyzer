import os
import shutil
from app.ai.resume_parser import (
    extract_resume_text
)
from app.ai.ats_engine import (
    calculate_ats_score
)

from fastapi import (
    UploadFile,
    HTTPException
)
from app.ai.resume_analyzer import (
    analyze_resume
)

from sqlalchemy.orm import Session

from app.models.resume import Resume

UPLOAD_DIR = "uploads"

ALLOWED_EXTENSIONS = [
    ".pdf",
    ".docx"
]

def validate_file(file: UploadFile):
    file_extension = os.path.splitext(
        file.filename
    )[1].lower()

    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed"
        )

def save_resume(
    file: UploadFile,
    user_id: int,
    db: Session
):
    validate_file(file)

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    resume_text = extract_resume_text(
        file_path
    )

    analysis = analyze_resume(
        resume_text
    )
    
    ats_result = calculate_ats_score(
        resume_text
    )
    
    new_resume = Resume(
        file_name=file.filename,
        file_path=file_path,
        user_id=user_id
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume