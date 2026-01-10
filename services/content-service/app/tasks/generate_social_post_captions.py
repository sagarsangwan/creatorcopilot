from app.core.config import settings
from celery.utils.log import get_task_logger
from app.celery_app import celery
from app.core.database import SessionLocal
from app.models.content import ContentPost, ContentStatus
from app.models.jobs import JobStatus, ContentJob
from app.models.generated_assets import GeneratedAsset
from app.models.visual_assest import VisualAsset
from app.schemas.ai_service import AIServiceResponse
import requests
import time
from uuid import UUID
from typing import cast
from app.tasks.fetch_ai_response_data import fetch_ai_response_data
from app.tasks.save_ai_json_to_db import save_ai_json_data_to_db
from app.services.update_job_status import update_job_status
from app.services.update_content_status import update_content_status

logger = get_task_logger(__name__)
AI_SERVICE_URL = settings.AI_SERVICE_URL


# def update_status()


@celery.task(
    name="content.generate_social_post_captions",
    bind=True,
    max_retries=3,
    track_started=True,
)
def generate_social_post_captions(self, job_id: str):
    db = SessionLocal()
    try:
        jobId = UUID(job_id)

        job = db.query(ContentJob).filter(ContentJob.id == jobId).first()
        if not job:
            raise Exception("Job not exist")
        if job.raw_ai_response is None:
            fetch_ai_response_data.delay(job_id)
        if job.raw_ai_response is not None and job.status != JobStatus.SUCCESS:
            save_ai_json_data_to_db.delay(job_id)
        return
    except Exception as e:
        return
