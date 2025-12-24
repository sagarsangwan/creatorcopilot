from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from app.core.database import engine, Base

Base.metedata.create_all(bind=engine)

app = FastAPI(
    title="content service",
    description="It is a microservice that handles content related to blogs uploaded by user",
    version="1.0.0",
)


origins = [
    "http://localhost:3000",
    "http://gateway:8000",
]

app.add_middleware(
    CORSMiddleware,
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {"Message": "Content service is working"}
