from app.core.config import settings
from celery.utils.log import get_task_logger
from app.celery_app import celery
from app.core.database import SessionLocal
from app.models.content import ContentPost, ContentStatus
from app.models.jobs import JobStatus, ContentJob
import requests

logger = get_task_logger(__name__)
AI_SERVICE_URL = settings.AI_SERVICE_URL


@celery.task(name="content.generate_social_post_captions", bind=True, max_retries=3)
def generate_social_post_captions(content_id: str, job_id: str, self):
    db = SessionLocal()
    try:
        content = db.query(ContentPost).filter(ContentPost.id == content_id).first()
        job = db.query(ContentJob).filter(ContentJob.id == job_id).first()
        if not job or not content:
            raise Exception("Job Or Content Not Found")
        job.status = JobStatus.RUNNING
        content.status = ContentStatus.PROCESSING
        db.commit()
        payload = {
            "title": content.title,
            "content": content.content,
            "ctaLink": content.ctaLink,
            "tone": content.tone,
            "audience": content.audience,
            "content_goal": content.content_goal,
            "platforms": content.platforms,  # if you have
            "keywords": content.keywords,
            "language": content.language,
        }
        res = requests.post(
            f"{AI_SERVICE_URL}/api/v1/ai-service/generate-post-captions",
            json=payload,
            timeout=120,
        )
        if res.status_code != 200:
            raise Exception(f"Ai service failed : {res.status_code} {res.text}")
        result = res.json()

        return
    except Exception as e:
        return
