from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

origins = [
    "http://localhost:3000",
    "http://gateway:8000",
]
app = FastAPI(
    title="AI service",
    description="It is a microservice that handles ai responses",
    version="1.0.0",
    redirect_slashes=True,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {"message": "AI service is running"}


@app.post("/api/v1/ai-service/generate-post-captions")
def generate_post_captions(request):
    return {"message": "hello"}
