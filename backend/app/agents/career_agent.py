from app.ai.ats_engine import (
    calculate_ats_score
)

from app.ai.jd_matcher import (
    match_resume_to_jd
)

from app.ai.resume_ai_assistant import (
    improve_resume
)

def run_career_agent(
    resume_text: str,
    job_description: str
):
    ats_result = calculate_ats_score(
        resume_text
    )

    jd_result = match_resume_to_jd(
        resume_text,
        job_description
    )

    ai_feedback = improve_resume(
        resume_text
    )

    return {
        "ats_analysis": ats_result,
        "job_match": jd_result,
        "ai_feedback": ai_feedback
    }