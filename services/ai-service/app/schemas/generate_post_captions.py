from pydantic import BaseModel
from typing import List, Optional


class GenrateAiResponseRequest(BaseModel):

    title: str
    content: str
    ctaLink: str = None
    ctaType: str = "NONE"
    language: str = "en"
    tone: Optional[str] = None
    audience: Optional[str] = None
    content_goal: Optional[str] = None
    platforms: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
