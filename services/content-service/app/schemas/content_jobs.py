from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID


class JobResponseSchema(BaseModel):
    id: UUID
    job_type: str
    progress: int
    status: str
    retries: int
    error: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ContentJobCreateSchema(BaseModel):
    job_type: str


class JobStatusResponse(BaseModel):
    status: str
    progress: int
