from pydantic import BaseModel

from typing import List, Optional


class EventCreateResponse(BaseModel):
    message: str
    status_code: int


class EventBase(BaseModel):
    user_id: str
    content_post_id: str
    platform: str
    token_used: int
    ai_provider: str
    model_version: str
    content_type: str
    latency_ms: int
    status: str


class EventCreateRequest(EventBase):
    user_id: str
    content_post_id: str
    platform: str
    token_used: int
    ai_provider: str
    model_version: str
    content_type: str
    latency_ms: int
    status: str


class EventDetails(EventBase):
    id: str
    created_at: str


class EventsListResponse(BaseModel):
    events: List[EventDetails]
    status_code: int
