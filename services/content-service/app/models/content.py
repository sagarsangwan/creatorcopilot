from app.core.database import Base
from sqlalchemy import Column, String, UUID, ARRAY, Text, Enum, TIMESTAMP
from sqlalchemy.sql import func
import enum
import uuid


class ContentStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PROCESSING = "PROCESSING"
    GENERATED = "GENERATED"
    FAILED = "FAILED"


class ContentPost(Base):
    __tablename__ = "content_posts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)

    primary_link = Column(Text, nullable=False)  # CTA (Medium/blog URL)

    language = Column(String(10), default="en")
    tone = Column(String(50))  # professional, casual, storytelling

    audience = Column(String(100))  # developers, founders
    content_goal = Column(String(50))  # educational, promotional

    keywords = Column(ARRAY(String))

    status = Column(
        Enum(ContentStatus, name="content_status"),
        default=ContentStatus.DRAFT,
        nullable=False,
    )

    ai_summary = Column(Text)
    ai_key_points = Column(ARRAY(String))

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
