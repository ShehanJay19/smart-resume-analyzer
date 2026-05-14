from app.ai.openai_client import get_openai_client

client = get_openai_client()

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

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content