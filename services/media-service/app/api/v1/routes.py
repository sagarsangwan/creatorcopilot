import time
from fastapi import APIRouter, HTTPException, status, Depends
import cloudinary
import cloudinary.utils
from sqlalchemy.orm import Session
import logging
from app.core.database import get_db
from app.schemas.media_schemas import MediaUploadInitiate, InitialUploadResponse
import uuid

router = APIRouter()
logger = logging.getLogger(__name__)
from app.core.config import settings
from app.database.upload_model import Media


@router.post("/media/initiate-upload", response_model=InitialUploadResponse)
async def initiate_upload(payload: MediaUploadInitiate, db: Session = Depends(get_db)):
    unique_id = str(uuid.uuid4)
    folder_path = f"users/{payload.user.email}/"
    public_id = f"{folder_path}/{unique_id}"
    timestamp = int(time.time())
    params = {"timestamp": timestamp, "public_id": public_id, "folder": folder_path}
    signature = cloudinary.utils.api_sign_request(
        params, settings.CLOUDINARY_API_SECRET
    )

    new_media = Media(
        user_id=str(payload.user.id),
        folder=folder_path,
        public_id=public_id,
        upload_status="initiated",
        media_type=payload.media_type,
        media_format=payload.media_format,
        media_name=payload.media_name,
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)

    return InitialUploadResponse(
        api_key=settings.CLOUDINARY_API_KEY,
        status="initiated",
        db_id=new_media.id,
        public_id=public_id,
        folder=folder_path,
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        timestamp=timestamp,
        signature=signature,
    )
