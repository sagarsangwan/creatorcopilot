import time
from fastapi import APIRouter, HTTPException, Request, status, Depends
import cloudinary
import cloudinary.utils
from sqlalchemy.orm import Session
import logging
from app.core.database import get_db
from app.schemas.media_schemas import MediaUploadInitiate, InitialUploadResponse
import uuid
import hmac
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
        media_type=payload.media_type,
        media_format=payload.media_format,
        media_name=payload.media_name,
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)

    return InitialUploadResponse(
        api_key=settings.CLOUDINARY_API_KEY,
        status=new_media.upload_status,
        db_id=new_media.id,
        public_id=public_id,
        folder=folder_path,
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        timestamp=timestamp,
        signature=signature,
    )


@router.post("/webhook/cloudnary")
async def cloudnary_webhook(request:Request, db:Session =Depends(get_db)):
    payload = await request.form()
    payload - dict(payload)
    recieved_signature = payload.get("signature")
    recieved_timestamp = payload.get("timestamp")

    if not recieved_signature or not recieved_timestamp:
        raise HTTPException(status_code=400, detail="invalid webhook")
    expected_signature = cloudinary.utils.api_sign_request(
        {"timestamp":recieved_timestamp}
        settings.CLOUDINARY_API_KEY
    )

    if not hmac.compare_digest(recieved_signature, expected_signature):
        raise HTTPException(status_code=401, detail= "signature mismatch")

    public_id = payload.get("public_id")
    secure_url = payload.get("secure_url")
    bytes_size = payload.get("bytes")
    duration = payload.get("duration")
    width = payload.get("width")
    height = payload.get("height")
    version = payload.get("version")
    resource_type = payload.get("resource_type")

    if not public_id:
        raise HTTPException(status_code=400, detail="missing public id")
    media = db.query(Media).filter(Media.public_id==public_id).first()
    if not media:
        return {"status": "ignored", "reason": "media not found"}
    
    media.file_url = secure_url
    media.file_size = bytes_size
    media.duration = duration
    media.width = width
    media.height = height
    media.version = version
    media.upload_status = "uploaded"
    media.raw_response = payload

    db.commit()
    return("status": "ok")
