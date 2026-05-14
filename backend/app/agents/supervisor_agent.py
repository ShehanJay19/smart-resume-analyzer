from app.agents.ats_agent import (
    run_ats_agent
)

from app.agents.resume_writer_agent import (
    run_resume_writer_agent
)

from app.agents.job_agent import (
    run_job_agent
)

from app.agents.interview_agent import (
    run_interview_agent
)

def run_supervisor_agent(
    resume_text: str,
    job_description: str
):
    ats_result = run_ats_agent(
        resume_text
    )

    job_result = run_job_agent(
        resume_text,
        job_description
    )

    resume_feedback = (
        run_resume_writer_agent(
            resume_text
        )
    )

    interview_help = (
        run_interview_agent(
            resume_text
        )
    )

    return {
        "ats_analysis": ats_result,
        "job_match": job_result,
        "resume_feedback": resume_feedback,
        "interview_preparation": interview_help
    }