from app.ai.hf_client import generate_text


def improve_resume(resume_text: str):
    prompt = f"""
    You are an expert resume writer.

    Review the resume below and provide concise, actionable feedback.
    Focus on structure, clarity, impact, and missing improvements.

    Resume:
    {resume_text}

    Return professional guidance that helps the candidate improve the resume.
    """

    return generate_text(
        prompt,
        max_new_tokens=450
    )
