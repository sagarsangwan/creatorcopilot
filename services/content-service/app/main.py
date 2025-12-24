from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.routes import router

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="content service",
    description="It is a microservice that handles content related to blogs uploaded by user",
    version="1.0.0",
    redirect_slashes=True,
)
app.include_router(router, prefix="/api/v1/content")
for route in app.routes:
    print(f"Route: {route.path} | Methods: {route.methods}", flush=True)
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
