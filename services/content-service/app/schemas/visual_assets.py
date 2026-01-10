from pydantic import BaseModel, ConfigDict, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, Any, Dict


# 1. Base Schema (Shared properties)
class VisualAssetBase(BaseModel):
    slide_index: int = Field(..., description="The order of the slide/visual")
    headline: Optional[str] = Field(None, max_length=255)
    subtext: Optional[str] = Field(None, max_length=500)
    meta_data: Optional[Dict[str, Any]] = Field(
        None, description="Metadata for image prompts or layout settings"
    )
    version: int = 1
    is_active: bool = True
    platform: str = Field(default="all", max_length=30)


# 2. Create Schema (Used for POST requests)
class VisualAssetCreate(VisualAssetBase):
    content_post_id: UUID
    job_id: UUID


# 3. Response Schema (Used for API returns)
class VisualAssetResponse(VisualAssetBase):
    id: UUID
    content_post_id: UUID
    job_id: UUID
    created_at: datetime
    updated_at: datetime

    # Enable conversion from SQLAlchemy ORM objects
    model_config = ConfigDict(from_attributes=True)


# 4. Update Schema (Used for PATCH requests)
class VisualAssetUpdate(BaseModel):
    headline: Optional[str] = None
    subtext: Optional[str] = None
    slide_index: Optional[int] = None
    is_active: Optional[bool] = None
    meta_data: Optional[Dict[str, Any]] = None
