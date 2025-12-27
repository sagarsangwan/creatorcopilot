from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime
from .content_jobs import JobResponseSchema


class ContentGenerationRequest(BaseModel):
    title: str
    content: str
    ctaLink: str = None

    language: str = "en"

    tone: Optional[str] = None
    audience: Optional[str] = None
    content_goal: Optional[str] = None

    keywords: Optional[List[str]] = None
    platforms: Optional[List[str]] = None
    job_type: str  # e.g. "GENERATE_SOCIAL_POSTS"


class ContentGenerateResponse(BaseModel):
    content_id: str
    job_id: str
    status: str  # PROCESSING
    # created_at: datetime


# class ContentCreateSchema(BaseModel):
#     title: str
#     content: str
#     ctaLink: str
#     language: str = "en"
#     tone: str
#     audience: str
#     content_goal: str
#     keywords: Optional[List[str]] = []
#     platforms: Optional[List[str]] = None


# class ContentCreateResponseSchema(BaseModel):
#     id: str
#     status: str
#     created_at: datetime


class ContentDetailSchema(BaseModel):
    id: str
    title: str
    content: str
    ctaLink: str

    language: str
    tone: Optional[str]
    audience: Optional[str]
    content_goal: Optional[str]
    platforms: Optional[List[str]] = []

    keywords: Optional[List[str]] = []

    outline: Optional[str]
    ai_summary: Optional[str]
    ai_key_points: Optional[List[str]]

    status: str

    jobs: List[JobResponseSchema]

    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class JobDetailSchema(BaseModel):
    id = str
    job_type: str
    retries: int
    error: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ContentUpdateSchema(BaseModel):
    title: Optional[str]
    content: Optional[str]
    ctaLink: Optional[str]

    tone: Optional[str]
    audience: Optional[str]
    content_goal: Optional[str]

    keywords: Optional[List[str]]

    outline: Optional[str]
    ai_summary: Optional[str]
    ai_key_points: Optional[List[str]]


class ContentDetailResponse(BaseModel):
    content: ContentDetailSchema
    job: Optional[JobDetailSchema]

    class Config:
        orm_mode = True
