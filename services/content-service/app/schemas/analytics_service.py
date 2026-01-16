from pydantic import BaseModel


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
