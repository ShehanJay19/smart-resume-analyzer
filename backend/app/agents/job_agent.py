from app.ai.jd_matcher import (
    match_resume_to_jd
)

def run_job_agent(
    resume_text: str,
    job_description: str
):
    return match_resume_to_jd(
        resume_text,
        job_description
    )