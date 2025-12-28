from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.schemas.generate_post_captions import GenrateAiResponseRequest

from .get_response_from_ai import getblogCaptionsFromAi
from .prompts.propmt_builder import build_prompt

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
def generate_post_captions(payload: GenrateAiResponseRequest):
    print(payload, flush=True)
    prompt = build_prompt(
        title=payload.title,
        content=payload.content,
        ctaLink=payload.ctaLink,
        language=payload.language,
        tone=payload.tone,
        audience=payload.audience,
        platforms=payload.platforms,
        content_goal=payload.content_goal,
        ctaType=payload.ctaType,
    )
    res = getblogCaptionsFromAi(blogCaptionPrompt=prompt)
    print(res, flush=True)

    return res
