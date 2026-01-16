from app.core.config import settings
from app.core.database import Base
from sqlalchemy import String, Integer, Column, TIMESTAMP, Date
import uuid
from sqlalchemy.sql import func, text


class DailyPlatformUsage(Base):
    __tablename__ = "daily_platform_usage"
    id = Column(
        String(36),
        default=lambda: str(uuid.uuid4()),
        primary_key=True,
    )
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    platform = Column(String(255))
    total_post_generated = Column(Integer, default=0)
    total_token_used = Column(Integer, default=0)
    total_latency_ms = Column(Integer, default=0)
    average_latency_ms = Column(Integer, default=0)
    date = Column(Date(), server_default=text("(CURRENT_DATE)"))

    def to_dict(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "platform": self.platform,
            "total_post_generated": self.total_post_generated,
            "total_token_used": self.total_token_used,
            "total_latency_ms": self.total_latency_ms,
            "average_latency_ms": self.average_latency_ms,
            "date": self.date,
        }
