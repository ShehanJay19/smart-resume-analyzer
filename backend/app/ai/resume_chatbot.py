from openai import OpenAI

from app.core.config import (
    OPENAI_API_KEY
)

client = OpenAI(
    api_key=OPENAI_API_KEY
)

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

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert resume assistant."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7
    )

    return response.choices[0].message.content