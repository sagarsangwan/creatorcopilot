from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
import logging
from app.core.database import get_db
from app.schemas.media_schemas import MediaUploadInitiate

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/media/initiate-upload")
async def initiate_upload(payload: MediaUploadInitiate, db: Session = Depends(get_db)):
    print(payload.user.id)
    return {"hii", "hiiii"}
