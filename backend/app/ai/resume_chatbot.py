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

    return generate_text(
        prompt,
        max_new_tokens=500
    )