from sqlalchemy.orm import relationship
from app.core.database import Base
from sqlalchemy import Column, ForeignKey, String, Integer, Text, UUID, Enum, TIMESTAMP
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

    generated_asset_id = Column(
        UUID(as_uuid=True),
        ForeignKey("generated_assets.id", ondelete="CASCADE"),
        nullable=False,
    )

    platform = Column(String(30), default="all")
    slide_index = Column(Integer, nullable=False)

    headline = Column(String(255))
    subtext = Column(String(500))

    meta_data = Column(JSONB)

    content = relationship("ContentPost", back_populates="visuals")

    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
