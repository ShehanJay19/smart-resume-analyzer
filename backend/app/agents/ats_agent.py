from app.ai.ats_engine import (
    calculate_ats_score
)

def run_ats_agent(
    resume_text: str
):
    return calculate_ats_score(
        resume_text
    )