from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
import logging
from app.core.database import get_db

router = APIRouter()
logger = logging.getLogger(__name__)


# @router.post("/media/initiate-upload")
# async def initiate_upload(request, db:Session=Depends(get_db )):
