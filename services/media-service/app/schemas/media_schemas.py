from pydantic import BaseModel, HttpUrl, ConfigDict
from typing import Optional, Dict, Any
from datetime import datetime

# class InitialUploadResponse(BaseModel):


class UserSchema(BaseModel):
    id: int
    email: str


class MediaUploadInitiate(BaseModel):
    user: UserSchema


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


class InitialUploadResponse(BaseModel):
    api_key: int
    status: str
    db_id: int
    public_id: str
    folder: str

    cloud_name: str
    timestamp: int
    signature: str


# class MediaCreate(BaseModel):
#     raw_response: Dict[str:Any]
#     upload_Status: str = "uploaded"


class MediaResponse(BaseModel):
    id: int
    user_id: str
    public_id: str

    url: Optional[str] = None
    secure_url: Optional[str] = None

    media_type: Optional[str] = None  # image | video
    media_format: Optional[str] = None
    media_name: Optional[str] = None

    size: Optional[int] = None
    duration: Optional[float] = None
    width: Optional[int] = None
    height: Optional[int] = None

    folder: Optional[str] = None
    version: Optional[str] = None

    upload_status: str
    visibility: str
    created_at: datetime
    # updated_at: Optional[datetime] = None

    # Enable ORM mode
    class Config:
        from_attributes = True
