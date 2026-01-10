from app.core.config import settings
from celery.utils.log import get_task_logger

from app.celery_app import celery
from app.core.database import SessionLocal
from app.models.jobs import ContentJob, JobStatus
from uuid import UUID
import requests
from app.tasks.save_ai_json_to_db import save_ai_json_data_to_db
from app.models.content import ContentPost, ContentStatus
from app.schemas.ai_service import AIServiceResponse
from app.services.update_job_status import update_job_status
from app.services.update_content_status import update_content_status
from app.services.mark_job_and_content_failed import mark_job_and_content_failed

AI_SERVICE_URL = settings.AI_SERVICE_URL
logger = get_task_logger(__name__)


@celery.task(
    name="content.fetch_ai_response_data", bind=True, max_retries=3, track_started=True
)
def fetch_ai_response_data(self, job_id: str):
    db = SessionLocal()
    try:
        jobId = UUID(job_id)
        job = db.query(ContentJob).filter(ContentJob.id == jobId).first()
        content = (
            db.query(ContentPost).filter(ContentPost.id == job.content_post_id).first()
        )
        update_content_status(status=ContentStatus.PROCESSING, db=db, content=content)
        update_job_status(db=db, job=job, progress=10, status=JobStatus.STARTED)
        if not job or not content:
            raise Exception("Job/content not exist")
        payload = {
            "title": content.title,
            "content": content.content,
            "ctaLink": content.ctaLink,
            "tone": content.tone,
            "audience": content.audience,
            "content_goal": content.content_goal,
            "platforms": content.platforms,
            "language": content.language,
        }

        res = requests.post(
            f"{AI_SERVICE_URL}/api/v1/ai-service/generate-post-captions",
            json=payload,
            timeout=120,
        )
        if res.status_code != 200:
            raise requests.RequestException(
                f"Ai service failed : {res.status_code} {res.text}"
            )
        job.raw_ai_response = res.json()
        db.commit()
        save_ai_json_data_to_db.delay(job_id)

    except requests.RequestException as e:
        logger.warning(f"retrying {self.request.retries+1} due to request error  : {e}")
        job.retries = self.request.retries + 1
        job.status = JobStatus.RETRY
        db.commit()
        if self.request.retries >= self.max_retries:
            mark_job_and_content_failed(db, job, content, str(e))
            raise

        raise self.retry(exc=e, countdown=30)
    except Exception as e:
        mark_job_and_content_failed(db, job, content, str(e))

        raise
    finally:
        db.close()
