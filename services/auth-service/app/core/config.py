import os
from dotenv import load_dotenv

load_dotenv()


class settings:
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM: str = "RS256"
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    GOOGLE_CLIENT_ID: str = os.getenv("GOOGLE_CLIENT_ID")
    # Must be GREATER than frontend's 45 minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 50
    # Must be GREATER than frontend's 6 days
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7


settings = settings()
