from core.database import Base
from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    Float,
    Integer,
    String,
    BigInteger,
    DateTime,
)
from sqlalchemy.sql import func


class Media(Base):
    __tablename__ = "media"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False)
    public_id = Column(String, nullable=False)

    file_url = Column(String, nullable=True)
    storage_key = Column(String, nullable=True)

    media_type = Column(String, nullable=True)  # image | video
    media_format = Column(String, nullable=True)  # jpg | png | mp4 | mov

    file_size = Column(BigInteger, nullable=True)
    duration = Column(Float, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)

    folder = Column(String, nullable=True)
    version = Column(String, nullable=True)

    upload_status = Column(
        String, default="initiated"
    )  # initiated | pending uploaded | failed

    raw_response = Column(JSON, nullable=True)
    variants = Column(String, default="original")
    soft_deleted = Column(Boolean, default=False)
    visibility = Column(String, default="private")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
