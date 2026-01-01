# jobs.py
from sqlalchemy import Column, String, Integer, Text, TIMESTAMP, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum

from app.core.database import Base


import enum


class JobStatus(str, enum.Enum):
    PENDING = "PENDING"
    STARTED = "STARTED"
    RETRY = "RETRY"
    FAILURE = "FAILURE"
    SUCCESS = "SUCCESS"


class ContentJob(Base):
    __tablename__ = "content_jobs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    content_post_id = Column(
        UUID(as_uuid=True),
        ForeignKey("content_posts.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    job_type = Column(String(50), nullable=False)
    status = Column(
        Enum(JobStatus, name="job_status"), default=JobStatus.PENDING, nullable=False
    )

    retries = Column(Integer, default=0)
    error = Column(Text)
    # job_broker_id = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now()
    )
