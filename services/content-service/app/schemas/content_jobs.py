from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class JobResponseSchema(BaseModel):
    id: str
    job_type: str
    status: str
    retries: int
    error: Optional[str]
    created_at: datetime


class ContentJobCreateSchema(BaseModel):
    job_type: str
