from fastapi import APIRouter, HTTPException, Request, Depends
import logging
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.schemas.content_post_schemas import (
    ContentGenerationRequest,
    ContentGenerateResponse,
    ContentDetailResponse,
)
from app.models.content import ContentPost, ContentStatus
from app.models.jobs import ContentJob, JobStatus
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter()


def get_current_user(request: Request):
    user_id = request.headers.get("X-User-Id")

    if not user_id:
        raise HTTPException(status_code=404, detail="Unauthorized")
    return user_id


@router.post("/posts", response_model=ContentGenerateResponse)
def posts(
    payload: ContentGenerationRequest,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    data_for_content = payload.model_dump(exclude={"job_type"})
    newContent = ContentPost(
        **data_for_content, user_id=user_id, status=ContentStatus.PROCESSING
    )
    db.add(newContent)
    db.flush()

    new_job = ContentJob(
        content_post_id=newContent.id,
        job_type=payload.job_type,
        status=JobStatus.QUEUED,
    )
    db.add(new_job)
    db.commit()
    db.refresh(newContent)
    db.refresh(new_job)

    return ContentGenerateResponse(
        content_id=str(newContent.id), status=new_job.status, job_id=str(new_job.id)
    )


@router.get("/posts/{content_id}")
def get_post_details(
    content_id: str,
    job_type: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user),
):
    print(content_id, flush=True)
    content = (
        db.query(ContentPost)
        .filter(ContentPost.id == content_id, ContentPost.user_id == user_id)
        .first()
    )
    if not content:
        raise HTTPException(status_code=404, detail="Content You Requested Not Found ")
    job = (
        db.query(ContentJob)
        .filter(
            ContentJob.content_post_id == content.id,
            ContentJob.job_type == job_type,
        )
        .order_by(ContentJob.created_at.desc())
        .first()
    )

    return ContentDetailResponse(content=content, job=job if job else None)
