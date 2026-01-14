from dataclasses import dataclass
from dotenv import load_dotenv

import os

load_dotenv()

print("--- DOCKER ENV DEBUG ---")
print(f"Current Dir: {os.getcwd()}")
print(f"DB_HOST from ENV: {os.getenv('DB_HOST')}")
print("------------------------")


@dataclass(frozen=True)
class Settings:
    DEBUG: bool = True
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    SERVICE_NAME: str = "analytics-service"
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = str(os.getenv("DB_PORT"))
    DB_NAME: str = os.getenv("DB_NAME")
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "")
    # DATABASE_URL

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )


settings = Settings()
