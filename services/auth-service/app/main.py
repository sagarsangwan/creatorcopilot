from fastapi import FastAPI
from app.core.database import engine, Base
from app.db.user_model import DBUser
from app.api.v1 import routes
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown: Clean up resources here if needed (e.g., engine.dispose())


app = FastAPI(
    title="Auth Microservice",
    version="1.0.0",
    description="Handles user authentication, Google OAuth, and JWT management.",
)

origins = [
    "http://localhost:3000",
    "http://gateway:8000",
]
app.include_router(routes.router, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,  # Allows cookies/auth headers to be sent cross-origin
    allow_methods=["*"],  # Allows all standard HTTP methods
    allow_headers=["*"],  # Allows all standard headers
)


@app.get("/")
def index():
    return {"message": "auth service is running"}
