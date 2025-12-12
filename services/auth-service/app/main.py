from fastapi import FastAPI
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Auth Microservice",
    version="1.0.0",
    description="Handles user authentication, Google OAuth, and JWT management.",
)


@app.get("/")
def index():
    return {"message": "auth service is running"}
