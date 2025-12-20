import datetime
from pydantic import BaseModel, HttpUrl
from typing import Optional, Dict, Any

# class InitialUploadResponse(BaseModel):


class UserSchema(BaseModel):
    id: int
    email: str


class MediaUploadInitiate(BaseModel):
    media_type: str
    media_format: str
    media_name: str
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
    api_key: str
    status: str
    db_id: int
    public_id: int
    folder: str

    cloud_name: str
    timestamp: int
    signature: str


# class MediaCreate(BaseModel):
#     raw_response: Dict[str:Any]
#     upload_Status: str = "uploaded"


class MediaRead(BaseModel):
    id: int
    uploaded_status: str

    class config:
        from_attributes = True
