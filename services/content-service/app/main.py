from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.routes import router


# Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown: Clean up resources here if needed (e.g., engine.dispose())


app = FastAPI(
    title="content service",
    description="It is a microservice that handles content related to blogs uploaded by user",
    version="1.0.0",
    redirect_slashes=True,
)


# @app.on_event("startup")
# def configure_db():
#     Base.metadata.create_all(bind=engine)


app.include_router(router, prefix="/api/v1/content")
origins = [
    "http://localhost:3000",
    "http://gateway:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {"Message": "Content service is working"}
