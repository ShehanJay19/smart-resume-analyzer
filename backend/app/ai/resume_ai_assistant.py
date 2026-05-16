from app.ai.hf_client import generate_text
from app.ai.ats_engine import calculate_ats_score


def improve_resume(resume_text: str):
    prompt = f"""
    You are an expert resume writer.

    Review the resume below and provide concise, actionable feedback.
    Focus on structure, clarity, impact, and missing improvements.

    Resume:
    {resume_text}

    Return professional guidance that helps the candidate improve the resume.
    """

    try:
        return generate_text(
            prompt,
            max_new_tokens=450
        )
    except RuntimeError:
        ats_result = calculate_ats_score(resume_text)
        missing_sections = ats_result.get("missing_sections", [])
        missing_skills = ats_result.get("missing_skills", [])

        return (
            "AI service is temporarily unavailable. "
            "Focus on clarity and impact. "
            f"Missing sections: {', '.join(missing_sections) or 'None'}. "
            f"Missing skills: {', '.join(missing_skills) or 'None'}. "
            "Add metrics, action verbs, and role-specific keywords."
        )
