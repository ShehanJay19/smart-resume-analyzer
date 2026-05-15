import requests

from app.core.config import HF_API_TOKEN, HF_MODEL

API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"


def generate_text(prompt: str, max_new_tokens: int = 512) -> str:
    headers = {}
    if HF_API_TOKEN:
        headers["Authorization"] = f"Bearer {HF_API_TOKEN}"

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": max_new_tokens,
            "temperature": 0.7,
            "return_full_text": False,
        },
    }

    response = requests.post(
        API_URL,
        headers=headers,
        json=payload,
        timeout=90
    )

    if response.status_code == 503:
        raise RuntimeError(
            "Hugging Face model is loading. Try again in a moment."
        )

    data = response.json()

    if response.status_code >= 400:
        error_message = data.get("error", "Hugging Face request failed.")
        raise RuntimeError(error_message)

    if isinstance(data, list) and data:
        generated_text = data[0].get("generated_text", "")
        if generated_text:
            return generated_text.strip()

    if isinstance(data, dict) and "generated_text" in data:
        return str(data["generated_text"]).strip()

    raise RuntimeError("Unexpected response from Hugging Face.")
