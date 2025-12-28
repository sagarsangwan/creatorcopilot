from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND")
    AI_SERVICE_URL = os.getenv("AI_SERVICE_URL")


settings = Settings()
