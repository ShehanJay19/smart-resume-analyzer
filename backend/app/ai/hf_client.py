import requests

from app.core.config import (
    OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL,
    OPENROUTER_MODEL,
    OPENROUTER_SITE_URL,
    OPENROUTER_APP_NAME
)

API_URL = f"{OPENROUTER_BASE_URL}/chat/completions"


def generate_text(prompt: str, max_new_tokens: int = 512) -> str:
    if not OPENROUTER_API_KEY:
        raise RuntimeError("OpenRouter API key is missing.")

    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    }
    if OPENROUTER_SITE_URL:
        headers["HTTP-Referer"] = OPENROUTER_SITE_URL
    if OPENROUTER_APP_NAME:
        headers["X-Title"] = OPENROUTER_APP_NAME

    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": max_new_tokens,
        "temperature": 0.7,
    }

    response = requests.post(
        API_URL,
        headers=headers,
        json=payload,
        timeout=120
    )

    content_type = response.headers.get("content-type", "")
    response_text = response.text.strip()
    if "application/json" in content_type:
        data = response.json()
    else:
        snippet = response_text[:400]
        raise RuntimeError(
            "OpenRouter returned a non-JSON response: "
            f"{response.status_code} url={response.url} body={snippet}"
        )

    if response.status_code >= 400:
        error_message = data.get("error", {}).get("message") or data.get(
            "error",
            "OpenRouter request failed."
        )
        snippet = response_text[:400]
        raise RuntimeError(
            f"{error_message} status={response.status_code} body={snippet}"
        )

    choices = data.get("choices", [])
    if choices:
        message = choices[0].get("message", {})
        content = message.get("content", "")
        if content:
            return content.strip()

    raise RuntimeError("Unexpected response from OpenRouter.")
