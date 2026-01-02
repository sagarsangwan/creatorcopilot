# from app.core.database import Base
# from sqlalchemy import Column, String, Integer, UUID, Text, JSON
# import uuid


# class AiModelMetaData(Base):
#     id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
#     ai_provider = Column(String(30), nullable=False)
#     model_version = Column(String(50), nullable=False)
#     prompt_version = Column(String(20), nullable=False)
#     usage_metadata = Column(JSON, nullable=False)
