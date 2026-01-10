# jobs.py
from sqlalchemy import Column, String, Integer, Text, TIMESTAMP, Enum, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum
from sqlalchemy.orm import relationship
from app.core.database import Base

from sqlalchemy.dialects.postgresql import JSONB

import enum


class JobStatus(str, enum.Enum):
    PENDING = "pending"
    STARTED = "started"
    RETRY = "retry"
    FAILURE = "failure"
    SUCCESS = "success"


class ContentJob(Base):
    __tablename__ = "content_jobs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content_post_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_posts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    post = relationship("ContentPost", back_populates="jobs")
    created_assets = relationship("GeneratedAsset", back_populates="source_job")
    raw_ai_response = Column(JSONB, nullable=True)

    job_type = Column(String(50), nullable=False)
    ai_provider = Column(String(30), nullable=True)
    model_version = Column(String(50), nullable=True)
    prompt_version = Column(String(20), nullable=True)
    usage_metadata = Column(JSON, nullable=True)
    status = Column(
        Enum(JobStatus, name="job_status", native_enum=True, create_type=False),
        default=JobStatus.PENDING,
        nullable=False,
    )
    progress = Column(Integer, default=0)
    retries = Column(Integer, default=0)
    error = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now()
    )
