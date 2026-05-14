from app.ai.resume_ai_assistant import (
    improve_resume
)

def run_resume_writer_agent(
    resume_text: str
):
    return improve_resume(
        resume_text
    )