import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    GEMENI_API_KEY = os.getenv("GEMINI_API_KEY")


settings = Settings()
