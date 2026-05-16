from app.ai.hf_client import generate_text

def ask_resume_chatbot(
    resume_text: str,
    ats_result: dict,
    user_message: str,
    chat_history: list
):
    history_text = ""

    for msg in chat_history:
        history_text += (
            f"{msg.role}: {msg.message}\n"
        )

    prompt = f"""
    You are an AI resume coach.

    Resume:
    {resume_text}

    ATS Analysis:
    {ats_result}

    Conversation History:
    {history_text}

    User Question:
    {user_message}

    Give detailed professional guidance.
    """

    try:
        response = generate_text(
            prompt,
            max_new_tokens=500
        )
        return response
    except RuntimeError:
        missing_sections = ats_result.get("missing_sections", [])
        missing_skills = ats_result.get("missing_skills", [])
        score = ats_result.get("ats_score", "N/A")

        return (
            "AI service is temporarily unavailable. "
            f"Your ATS score is {score}. "
            f"Missing sections: {', '.join(missing_sections) or 'None'}. "
            f"Missing skills: {', '.join(missing_skills) or 'None'}. "
            "Consider adding measurable impact and aligning keywords to the JD."
        )