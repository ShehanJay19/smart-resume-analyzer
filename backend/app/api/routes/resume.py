from app.models.resume import Resume
from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File
)
from app.agents.supervisor_agent import (
    run_supervisor_agent
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
from app.schemas.chat import (
    ChatRequest
)

from app.ai.resume_chatbot import (
    ask_resume_chatbot
)

from app.ai.ats_engine import (
    calculate_ats_score
)
from app.services.chat_service import (
    save_message,
    get_chat_history
)


from app.ai.vector_store import (
    search_jobs
)
from app.schemas.agent import (
    CareerAgentRequest
)

from app.agents.career_agent import (
    run_career_agent
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

@router.post("/chat")
def resume_chat(
    request: ChatRequest,
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

    ats_result = calculate_ats_score(
        resume_text
    )

    chat_history = get_chat_history(
        current_user.id,
        db
    )

    save_message(
        current_user.id,
        "user",
        request.message,
        db
    )

    response = ask_resume_chatbot(
        resume_text,
        ats_result,
        request.message,
        chat_history
    )

    save_message(
        current_user.id,
        "assistant",
        response,
        db
    )

    return {
        "response": response
    }

@router.get("/job-recommendations")
def get_job_recommendations(
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

    results = search_jobs(
        resume_text
    )

    return results    
@router.post("/career-agent")
def career_agent(
    request: CareerAgentRequest,
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

    result = run_career_agent(
        resume_text,
        request.job_description
    )

    return result
@router.post("/supervisor-agent")
def supervisor_agent(
    request: CareerAgentRequest,
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

    result = run_supervisor_agent(
        resume_text,
        request.job_description
    )

    return result