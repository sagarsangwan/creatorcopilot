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
from sqlalchemy.orm import relationship
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
    content_post_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_posts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    previous_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("generated_assets.id", ondelete="CASCADE"),
        nullable=True,
    )
    post = relationship("ContentPost", back_populates="assets")
    source_job = relationship("ContentJob", back_populates="created_assets")
    job_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_jobs.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    platform = Column(String(30), nullable=False, index=True)

    version = Column(Integer, default=1)
    text = Column(Text, nullable=True)
    meta_data = Column(JSONB, nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
