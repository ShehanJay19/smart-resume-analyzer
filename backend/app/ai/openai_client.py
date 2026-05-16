from openai import OpenAI

from app.core.config import (
    OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL
)


def get_openai_client() -> OpenAI:
    return OpenAI(
        api_key=OPENROUTER_API_KEY,
        base_url=OPENROUTER_BASE_URL
    )
