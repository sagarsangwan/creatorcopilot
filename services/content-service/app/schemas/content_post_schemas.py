from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime
from .content_jobs import JobResponseSchema
from uuid import UUID


class ContentGenerationRequest(BaseModel):
    title: str
    content: str
    ctaLink: str = None

    language: str
    ctaType: str = None
    tone: Optional[str]
    audience: Optional[str]
    content_goal: Optional[str]
    version: int
    # keywords: Optional[List[str]]
    platforms: Optional[List[str]]
    job_type: str  # e.g. "GENERATE_SOCIAL_POSTS"


class ContentGenerateResponse(BaseModel):
    content_id: str
    job_id: str
    status: str  # PROCESSING
    # created_at: datetime


class ContentBaseSchema(BaseModel):
    id: UUID
    title: str
    status: str
    created_at: datetime
    updated_at: datetime
    platforms: List[str]
    jobs: list[JobResponseSchema] = []

    class Config:
        from_attributes = True


class ContentDetailSchema(ContentBaseSchema):
    platforms: List[str] = []
    content: str
    ctaLink: str
    ctaType: str
    language: str
    tone: str
    audience: str
    keywords: Optional[List[str]] = []
    updated_at: datetime

    class Config:
        from_attributes = True


class JobDetailSchema(BaseModel):
    id: UUID
    job_type: str
    retries: int
    status: str
    percentage: int
    error: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ContentDetailResponse(BaseModel):
    content: ContentDetailSchema
    job: Optional[JobDetailSchema] = None

    class Config:
        from_attributes = True


class ContentSummarySchema(ContentBaseSchema):
    pass


class ContentListResponse(BaseModel):
    total: int
    posts: List[ContentSummarySchema]
