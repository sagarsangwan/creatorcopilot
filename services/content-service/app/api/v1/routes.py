from fastapi import APIRouter, HTTPException, Request, Depends
import logging
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.schemas.content_post_schemas import (
    ContentGenerationRequest,
    ContentGenerateResponse,
    ContentDetailResponse,
    ContentListResponse,
)
import uuid
from app.schemas.content_jobs import JobStatusResponse
from celery.result import AsyncResult
from app.celery_app.celery import celery
from typing import Optional
from app.models.content import ContentPost, ContentStatus
from app.models.jobs import ContentJob, JobStatus
from datetime import datetime
from app.tasks.generate_social_post_captions import generate_social_post_captions

logger = logging.getLogger(__name__)
router = APIRouter()


def get_current_user(request: Request):
    user_id = request.headers.get("X-User-Id")
    if not user_id:
        raise HTTPException(status_code=404, detail="Unauthorized")
    return user_id


def retrive_job_status_from_db(id: str, db: Session):

    try:
        id = uuid.UUID(id)
    except ValueError:
        raise ValueError("not valis id")

    job = db.query(ContentJob).filter(ContentJob.id == id).first()
    if not job:
        raise LookupError("Job not exist")
    return JobStatus(job.status)


@router.get("/job/status/{id}")
def job_status(
    id: str, db: Session = Depends(get_db), user_id: str = Depends(get_current_user)
):
    task = AsyncResult(id=id, app=celery)
    task_meta = task.backend.get(task.backend.get_key_for_task(id))
    if task_meta is not None:
        return JobStatusResponse(status=JobStatus(task.state))
    try:
        status = retrive_job_status_from_db(id=id, db=db)
        return JobStatusResponse(status=status)
    except LookupError:
        raise HTTPException(status_code=400, detail="Job Not Found")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Job id Format")
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


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
    generate_social_post_captions.apply_async((newContent.id, new_job.id), task_id="2")

    # return ContentGenerateResponse(
    #     content_id=str(1), status="new_job.status", job_id=str(1)
    # )
    return ContentGenerateResponse(
        content_id=str(newContent.id), status=new_job.status, job_id=str(new_job.id)
    )


@router.get("/posts", response_model=ContentListResponse)
def get_all_posts(
    limit: Optional[int] = None,
    offset: int = 0,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(ContentPost).filter(ContentPost.user_id == user_id)
    total_count = query.count()

    query = query.order_by(ContentPost.created_at.desc())
    if limit is not None:
        query = query.offset(offset).limit(limit)

    content_posts = query.all()

    return ContentListResponse(total=len(content_posts), posts=content_posts)


@router.get("/posts/{content_id}", response_model=ContentDetailResponse)
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
