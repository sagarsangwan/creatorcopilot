import datetime
from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any


class MediaBase(BaseModel):
    user_id: str
    public_id: str
    file_url: HttpUrl
    media_type: Optional[str] = None  # 'image' or 'video'
    media_format: Optional[str] = None  # 'mp4', 'png', etc.
    file_size: Optional[int] = None
    duration: Optional[float] = None
    width: Optional[int] = None
    height: Optional[int] = None
    folder: Optional[str] = None
    version: Optional[str] = None
    visibility: str = "private"


class MediaCreate(BaseModel):
    raw_response: Dict[str:Any]
    upload_Status: str = "uploaded"


class MediaRead(BaseModel):
    id: int
    uploaded_status: str

    class config:
        from_attributes = True
