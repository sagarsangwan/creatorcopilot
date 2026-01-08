from datetime import datetime, timezone
from sqlalchemy import Column, UUID, Integer, Boolean, String, DateTime
from sqlalchemy import func
from app.core.database import Base

import uuid


class DBUser(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    image = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    emailVerified = Column(Boolean, default=False)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
