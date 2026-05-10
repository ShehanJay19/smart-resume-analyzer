import os
import shutil

from fastapi import (
    UploadFile,
    HTTPException
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

    new_resume = Resume(
        file_name=file.filename,
        file_path=file_path,
        user_id=user_id
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return new_resume