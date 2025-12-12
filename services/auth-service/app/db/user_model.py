from datetime import datetime, timezone
from sqlalchemy import Column, Integer, Boolean, String, DateTime
from sqlalchemy import func
from app.core.database import Base
import uuid


class DBUser(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    image = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    # You can remove the 'default=datetime.now(timezone.utc)' part entirely.
