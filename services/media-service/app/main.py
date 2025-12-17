from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://gateway:8000",
]


app = FastAPI(
    title="FastAPI media upload service",
    version="1.0.0",
    description="Handle media upload",
)
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
