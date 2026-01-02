from sqlalchemy.orm import relationship
from app.core.database import Base
from sqlalchemy import (
    Column,
    ForeignKey,
    String,
    Integer,
    Text,
    UUID,
    Enum,
    TIMESTAMP,
    Boolean,
)
from sqlalchemy.sql import func
import uuid
import enum
from sqlalchemy.dialects.postgresql import JSONB


class VisualAsset(Base):
    __tablename__ = "visual_assets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    content_post_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_posts.id", ondelete="CASCADE"),
        nullable=False,
    )
    job_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_jobs.id", ondelete="CASCADE"),
        nullable=False,
    )
    post = relationship("ContentPost", back_populates="visuals")
    slide_index = Column(Integer, nullable=False)
    headline = Column(String(255))
    subtext = Column(String(500))
    meta_data = Column(JSONB, nullable=True)
    version = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    platform = Column(String(30), default="all")
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
