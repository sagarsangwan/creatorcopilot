from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime


class UserSchema(BaseModel):
    id: int
    email: str


class ContentCreateSchema(BaseModel):
    title: str
    content: str
    ctaLink: str
    language: str = "en"
    tone: str
    audience: str
    content_goal: str
    keywords: Optional[List[str]] = []
    outline: str


class ContentCreateResponseSchema(BaseModel):
    id: str
    status: str
    # created_at: datetime
