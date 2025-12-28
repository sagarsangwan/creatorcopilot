from app.core.database import Base
from sqlalchemy import (
    Column,
    String,
    Text,
    Enum,
    TIMESTAMP,
    ForeignKey,
    Integer,
    Boolean,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import enum
import uuid


class AssetStatus(str, enum.Enum):
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"


class GeneratedAsset(Base):
    __tablename__ = "generated_assets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Ownership
    content_post_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_posts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    job_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_jobs.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Platform identity
    platform = Column(String(30), nullable=False, index=True)
    asset_type = Column(String(30), nullable=False)
    # e.g. "caption", "thread", "post"

    variant_index = Column(Integer, default=0, nullable=False)

    # Main generated text (caption / post / tweet)
    text = Column(Text, nullable=True)
    # Structured extras (hashtags, first_comment, hooks, etc.)
    meta_data = Column(JSONB, nullable=True)

    # AI traceability
    ai_provider = Column(String(30), nullable=False)  # gemini, openai
    model_name = Column(String(50), nullable=False)  # gemini-1.5-pro
    prompt_version = Column(String(20), nullable=False)
    # Execution
    status = Column(
        Enum(AssetStatus, name="asset_status"),
        default=AssetStatus.QUEUED,
        nullable=False,
    )
    error = Column(Text)
    tokens_used = Column(Integer)
    latency_ms = Column(Integer)

    # Versioning / lifecycle
    is_active = Column(Boolean, default=True)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
