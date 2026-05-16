from app.ai.hf_client import generate_text

def run_interview_agent(
    resume_text: str
):
    prompt = f"""
    Based on this resume,
    generate likely interview questions
    and preparation tips.

    Resume:
    {resume_text}
    """

    return generate_text(
        prompt,
        max_new_tokens=350
    )