from openai import OpenAI

from app.core.config import (
    OPENAI_API_KEY
)

client = OpenAI(
    api_key=OPENAI_API_KEY
)

def improve_resume(
    resume_text: str
):
    prompt = f"""
    You are a professional ATS resume coach.

    Analyze this resume and provide:

    1. Resume weaknesses
    2. ATS optimization suggestions
    3. Improved bullet points
    4. Missing important skills
    5. Professional wording improvements

    Resume:
    {resume_text}
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert resume reviewer."
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