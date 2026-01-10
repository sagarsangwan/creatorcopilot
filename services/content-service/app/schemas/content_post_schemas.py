from pydantic import BaseModel, HttpUrl, Field, ConfigDict
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from .content_jobs import JobResponseSchema
from app.schemas.assets import GeneratedAssetResponse
from app.schemas.visual_assets import VisualAssetResponse

# Shared configuration for all response models
# Replaces 'class Config' in Pydantic V2
common_config = ConfigDict(from_attributes=True)


class ContentGenerationRequest(BaseModel):
    title: str = Field(..., min_length=5, max_length=255)
    content: str = Field(..., description="The source blog or text content")
    ctaLink: Optional[str] = (
        None  # Using str instead of HttpUrl if you expect partial links
    )
    language: str = Field(default="en")
    ctaType: Optional[str] = "none"
    tone: Optional[str] = None
    audience: Optional[str] = None
    content_goal: Optional[str] = None
    version: int = Field(default=1)
    platforms: List[str] = Field(default_factory=list)
    job_type: str = Field(..., examples=["GENERATE_SOCIAL_POSTS"])


class ContentGenerateResponse(BaseModel):
    content_id: UUID
    job_id: UUID
    status: str = Field(default="PROCESSING")


class ContentBaseSchema(BaseModel):
    id: UUID
    title: str
    status: str
    created_at: datetime
    updated_at: datetime
    platforms: List[str] = []

    model_config = common_config


class ContentDetailSchema(ContentBaseSchema):
    content: str
    ctaLink: Optional[str] = None
    ctaType: Optional[str] = None
    language: str
    tone: str = None
    audience: str = None
    keywords: List[str] = Field(default_factory=list)
    # Use relationship names from your SQLAlchemy models
    assets: Optional[List[GeneratedAssetResponse]] = Field(default_factory=list)
    visuals: Optional[List[VisualAssetResponse]] = Field(default_factory=list)
    jobs: List[JobResponseSchema] = Field(default_factory=list)


class ContentSummarySchema(ContentBaseSchema):
    """Summarized view for lists, excludes heavy 'content' and 'assets' fields"""

    # Includes jobs to show progress bars in the dashboard list
    jobs: List[JobResponseSchema] = Field(default_factory=list)


class ContentListResponse(BaseModel):
    total: int
    posts: List[ContentSummarySchema]
