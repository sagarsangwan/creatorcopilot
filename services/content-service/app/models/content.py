from app.core.database import Base
from sqlalchemy import Column, String, UUID, ARRAY, Text, Enum, TIMESTAMP
from sqlalchemy.sql import func
import enum
import uuid
from sqlalchemy.orm import relationship


class ContentStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PROCESSING = "PROCESSING"
    GENERATED = "GENERATED"
    FAILED = "FAILED"


class CtaType(str, enum.Enum):
    READ_BLOG = "READ_BLOG"
    VISITWEBSITE = "VISIT_WEBSITE"
    SIGN_UP = "SIGN_UP"
    LEARN_MORE = "LEARN_MORE"
    WATCH_VIDEO = "WATCH_VIDEO"
    DOWNLOAD = "DOWNLOAD"
    NONE = "NONE"


class ContentPost(Base):
    __tablename__ = "content_posts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)

    ctaLink = Column(String, nullable=False)
    ctaType = Column(Enum(CtaType, name="cta_type"), default=CtaType.NONE)

    language = Column(String(10), default="en")

    outline = Column(String, nullable=True)
    tone = Column(String(50))
    audience = Column(String(100))
    content_goal = Column(String(50))

    keywords = Column(ARRAY(String), nullable=True)
    platforms = Column(ARRAY(String), nullable=True)
    status = Column(
        Enum(ContentStatus, name="content_status"),
        default=ContentStatus.DRAFT,
        nullable=False,
    )

    visuals = relationship(
        "VisualAsset", back_populates="content", cascade="all, delete-orphan"
    )
    assets = relationship(
        "GeneratedAsset", back_populates="content", cascade="all, delete-orphan"
    )
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
