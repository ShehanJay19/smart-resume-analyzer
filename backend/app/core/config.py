from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
HF_API_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL = os.getenv(
	"HF_MODEL",
	"HuggingFaceH4/zephyr-7b-beta"
)