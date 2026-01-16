from app.core.database import Base
from sqlalchemy import Column, String, Enum, UUID, Text, Integer, TIMESTAMP, int
import uuid
from sqlalchemy.sql import func
import enum


class ContentEventType(str, enum.Enum):
    CONTENT = "content"
    PROMPT = "PROMPT"


class GenerationStatus(str, enum.Enum):
    PENDING = "pending"
    STARTED = "started"
    RETRY = "retry"
    FAILURE = "failure"
    SUCCESS = "success"


class ContentGenerationEvent(Base):
    __table_name__ = "content_generation_events"
    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    user_id = Column(String, nullable=False)
    content_post_id = Column(String, nullable=True)
    platform = Column(String, nullable=False)
    token_used = Column(int)
    ai_provider = Column(String)
    model_version = Column(String)
    content_type = Column(String)
    latency_ms = Column(Integer, default=0)
    status = Column(
        Enum(
            GenerationStatus,
            name="content_generation_status",
            native_enum=True,
            create_type=False,
        ),
        default=GenerationStatus.SUCCESS,
    )
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
