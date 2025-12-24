from fastapi import APIRouter, HTTPException, Request, Depends
import logging
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.schemas.content_post_schemas import (
    ContentCreateSchema,
    ContentCreateResponseSchema,
)
from app.models.content import ContentPost
from app.models.jobs import ContentJob
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter()


def get_current_user(request: Request):
    user_id = request.headers.get("X-User-Id")

    if not user_id:
        raise HTTPException(status_code=404, detail="Unauthorized")
    return user_id


@router.post("/posts", response_model=ContentCreateResponseSchema)
def posts(
    payload: ContentCreateSchema,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    print(payload, user_id, flush=True)
    return ContentCreateResponseSchema(id="gen-001", status="initiated")
