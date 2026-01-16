from app.core.database import Base
from sqlalchemy import Column, String, Enum, UUID, Text, Integer, TIMESTAMP
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
    __tablename__ = "content_generation_events"
    id = Column(String(36), default=lambda: str(uuid.uuid4()), primary_key=True)
    user_id = Column(String(255), nullable=False)
    content_post_id = Column(String(255), nullable=True)
    platform = Column(String(255), nullable=False)
    token_used = Column(Integer)
    ai_provider = Column(String(255))
    model_version = Column(String(255))
    content_type = Column(String(255))
    latency_ms = Column(Integer, default=0)
    status = Column(
        Enum(
            GenerationStatus,
            name="content_generation_status",
            native_enum=False,
            create_type=False,
        ),
        default=GenerationStatus.SUCCESS,
    )
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
