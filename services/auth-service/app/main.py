from fastapi import FastAPI
from app.core.database import engine, Base
from app.db.user_model import DBUser
from app.api.v1 import routes

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Auth Microservice",
    version="1.0.0",
    description="Handles user authentication, Google OAuth, and JWT management.",
)
app.include_router(routes.router, prefix="/api/v1")


@app.get("/")
def index():
    return {"message": "auth service is running"}
