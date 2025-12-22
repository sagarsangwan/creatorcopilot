import hmac
import hashlib
import time
from datetime import datetime
from fastapi import APIRouter, HTTPException, Request, status, Depends
import cloudinary
import cloudinary.utils
from sqlalchemy.orm import Session
import logging

from sqlalchemy.sql.coercions import expect
from app.core.database import get_db
from app.schemas.media_schemas import (
    MediaUploadInitiate,
    InitialUploadResponse,
    MediaResponse,
    UserSchema,
)
import uuid
from typing import List

router = APIRouter()
logger = logging.getLogger(__name__)
from app.core.config import settings
from app.database.upload_model import Media


@router.post("/initiate-upload", response_model=InitialUploadResponse)
async def initiate_upload(payload: MediaUploadInitiate, db: Session = Depends(get_db)):
    unique_id = str(uuid.uuid4())
    folder = f"users/{payload.user.id}"

    timestamp = int(time.time())
    params = {"timestamp": timestamp, "public_id": unique_id, "folder": folder}
    signature = cloudinary.utils.api_sign_request(
        params, settings.CLOUDINARY_API_SECRET
    )
    new_media = Media(
        user_id=str(payload.user.id), folder=folder, public_id=f"{folder}/{unique_id}"
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)

    return InitialUploadResponse(
        api_key=settings.CLOUDINARY_API_KEY,
        status=new_media.upload_status,
        db_id=new_media.id,
        public_id=new_media.public_id,
        folder=new_media.folder,
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        timestamp=timestamp,
        signature=signature,
    )


@router.get("/", response_model=List[MediaResponse])
async def list_media(payload: UserSchema, db: Session = Depends(get_db)):
    if not payload.id:
        raise HTTPException(status_code=404, detail="user is not logged in")
    result = (
        db.query(Media)
        .filter(Media.user_id == str(payload.id), Media.upload_status == "UPLOADED")
        .all()
    )

    return result


@router.post("/webhooks/cloudinary")
async def cloudinary_webhook(
    request: Request,
    db: Session = Depends(get_db),
):
    payload = await request.json()

    # 1️⃣ Basic source validation
    if payload.get("signature_key") != settings.CLOUDINARY_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid Cloudinary source")

    if payload.get("notification_type") != "upload":
        return {"status": "ignored"}

    public_id = payload.get("public_id")
    if not public_id:
        return {"status": "ignored", "reason": "missing public_id"}

    media = db.query(Media).filter(Media.public_id == public_id).first()
    if not media:
        return {"status": "ignored", "reason": "media not found"}

    media.url = payload.get("url")
    media.secure_url = payload.get("secure_url")
    media.size = payload.get("bytes")
    media.duration = payload.get("duration")
    media.width = payload.get("width")
    media.height = payload.get("height")
    media.version = str(payload.get("version"))
    media.upload_status = "UPLOADED"
    media.storage_key = public_id
    media.raw_response = payload
    media.media_name = payload.get("original_filename")
    media.media_format = payload.get("format")
    media.media_type = payload.get("resource_type")

    db.commit()
    return {"status": "ok"}
