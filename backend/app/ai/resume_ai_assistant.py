from app.ai.openai_client import get_openai_client


client = get_openai_client()


def improve_resume(resume_text: str):
    prompt = f"""
    You are an expert resume writer.

    Review the resume below and provide concise, actionable feedback.
    Focus on structure, clarity, impact, and missing improvements.

    Resume:
    {resume_text}

    Return professional guidance that helps the candidate improve the resume.
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
