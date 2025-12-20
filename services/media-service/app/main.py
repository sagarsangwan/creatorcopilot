from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import Base, engine
from .api.v1.routes import router

origins = [
    "http://localhost:3000",
    "http://gateway:8000",
]
Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="FastAPI media upload service",
    version="1.0.0",
    description="Handle media upload",
)

app.include_router(router, prefix="/api/v1/media")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Allows cookies/auth headers to be sent cross-origin
    allow_methods=["*"],  # Allows all standard HTTP methods
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"hello ", "media upload service is running"}
