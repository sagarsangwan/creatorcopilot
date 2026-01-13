from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()
import os


@dataclass(frozen=True)
class Settings:
    DEBUG: bool = True
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    SERVICE_NAME: str = "analytics-service"


settings = Settings()
