from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY") or os.getenv("OPENROUTE_API_KEY")
OPENROUTER_BASE_URL = os.getenv(
	"OPENROUTER_BASE_URL",
	"https://openrouter.ai/api/v1"
)
OPENROUTER_MODEL = os.getenv(
	"OPENROUTER_MODEL",
	"openai/gpt-4o-mini"
)
OPENROUTER_SITE_URL = os.getenv("OPENROUTER_SITE_URL")
OPENROUTER_APP_NAME = os.getenv("OPENROUTER_APP_NAME")
HF_API_TOKEN = os.getenv("HF_API_TOKEN")
HF_API_BASE = os.getenv(
	"HF_API_BASE",
	"https://api-inference.huggingface.co"
)
HF_MODEL = os.getenv(
	"HF_MODEL",
	"HuggingFaceH4/zephyr-7b-beta"
)