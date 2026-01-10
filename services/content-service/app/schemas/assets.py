from pydantic import BaseModel, ConfigDict, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, Any, Dict


# 1. Base Schema (Common fields)
class GeneratedAssetBase(BaseModel):
    platform: str = Field(
        ..., max_length=30, description="The social platform (e.g., linkedin, twitter)"
    )
    version: int = Field(default=1)
    text: Optional[str] = None
    meta_data: Optional[Dict[str, Any]] = None
    is_active: bool = True

    class Config:
        from_attributes = True


class GeneratedAssetCreate(GeneratedAssetBase):
    content_post_id: UUID
    job_id: UUID
    previous_version_id: Optional[UUID] = None


class GeneratedAssetResponse(GeneratedAssetBase):
    id: UUID
    content_post_id: UUID
    job_id: UUID
    previous_version_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class GeneratedAssetUpdate(BaseModel):
    text: Optional[str] = None
    meta_data: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None
    version: Optional[int] = None
