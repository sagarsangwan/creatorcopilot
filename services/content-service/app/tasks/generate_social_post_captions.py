from app.core.config import settings
from celery.utils.log import get_task_logger
from app.celery_app import celery
from app.core.database import SessionLocal
from app.models.content import ContentPost, ContentStatus
from app.models.jobs import JobStatus, ContentJob
import requests
import time
from uuid import UUID

logger = get_task_logger(__name__)
AI_SERVICE_URL = settings.AI_SERVICE_URL


@celery.task(
    name="content.generate_social_post_captions",
    bind=True,
    max_retries=3,
    track_started=True,
)
def generate_social_post_captions(content_id: UUID, job_id: UUID, self):
    db = SessionLocal()
    try:
        time.sleep(12)
        content = db.query(ContentPost).filter(ContentPost.id == content_id).first()
        job = db.query(ContentJob).filter(ContentJob.id == job_id).first()
        if not job:
            raise Exception("Job not found")
        if not content:
            raise Exception("Content not found")
        job.status = JobStatus.STARTED
        content.status = ContentStatus.PROCESSING
        db.commit()
        self.update_state(state=JobStatus.STARTED, meta={"progress": 20})
        payload = {
            "title": content.title,
            "content": content.content,
            "ctaLink": content.ctaLink,
            "tone": content.tone,
            "audience": content.audience,
            "content_goal": content.content_goal,
            "platforms": content.platforms,
            "keywords": content.keywords,
            "language": content.language,
        }
        res = requests.post(
            f"{AI_SERVICE_URL}/api/v1/ai-service/generate-post-captions",
            json=payload,
            timeout=120,
        )
        self.update_state(state=JobStatus.STARTED, meta={"progress": 70})
        if res.status_code != 200:
            raise RuntimeError(f"Ai service failed : {res.status_code} {res.text}")
        result = res.json()

        job.status = JobStatus.SUCCESS
        content.status = ContentStatus.GENERATED
        db.commit()
        self.update_state(state=JobStatus.STARTED, meta={"progress": 80})

        return result
    except requests.RequestException as e:
        logger.warning(f"retrying {self.request.retries+1} due to request error  : {e}")
        job.retries = self.request.retries + 1
        job.status = JobStatus.RETRY
        db.commit()
        raise self.retry(exc=e)
    except Exception as e:
        job.status = JobStatus.FAILURE
        job.error = str(e)
        db.commit()
        raise e
    finally:
        db.close()
