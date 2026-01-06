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

logger = get_task_logger(__name__)
AI_SERVICE_URL = settings.AI_SERVICE_URL


@celery.task(
    name="content.generate_social_post_captions",
    bind=True,
    max_retries=3,
    track_started=True,
)
def generate_social_post_captions(self, content_idd: str, job_idd: str):
    db = SessionLocal()

    job = None
    try:
        content_id = UUID(content_idd)
        job_id = UUID(job_idd)
        content = db.query(ContentPost).filter(ContentPost.id == content_id).first()
        job = db.query(ContentJob).filter(ContentJob.id == job_id).first()
        if not job:
            raise Exception("Job not found")
        if not content:
            raise Exception("Content not found")
        job.status = JobStatus.STARTED
        content.status = ContentStatus.PROCESSING

        self.update_state(state=JobStatus.STARTED.value, meta={"progress": 20})
        job.progress = 20
        print(job.progress, "......................", flush=True)
        db.commit()
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
        try:
            res = requests.post(
                f"{AI_SERVICE_URL}/api/v1/ai-service/generate-post-captions",
                json=payload,
                timeout=120,
            )
        except Exception as e:
            raise e
        self.update_state(state=JobStatus.STARTED.value, meta={"progress": 70})
        job.progress = 70
        db.commit()
        if res.status_code != 200:
            raise RuntimeError(f"Ai service failed : {res.status_code} {res.text}")
        result = AIServiceResponse(**res.json())

        # job relaed data
        job.ai_provider = result.ai_provider
        job.model_version = result.model_version
        job.prompt_version = result.prompt_version
        job.usage_metadata = result.usage_metadata

        for asset in result.assets:
            new_assest = GeneratedAsset(
                content_post_id=content_id,
                job_id=job_id,
                platform=asset.platform,
                text=asset.text,
                meta_data=asset.meta_data,
            )
            db.add(new_assest)
            db.commit()
        self.update_state(state=JobStatus.STARTED.value, meta={"progress": 80})
        job.progress = 80
        db.commit()
        for visual in result.visuals:
            new_visual = VisualAsset(
                content_post_id=content_id,
                job_id=job_id,
                slide_index=visual.slide_index,
                headline=visual.headline,
                subtext=visual.subtext,
            )
            db.add(new_visual)
            db.commit()

        self.update_state(state=JobStatus.STARTED.value, meta={"progress": 90})
        job.progress = 90
        job.status = JobStatus.SUCCESS
        content.status = ContentStatus.GENERATED
        db.commit()
        self.update_state(state=JobStatus.STARTED.value, meta={"progress": 100})
        job.progress = 100
        db.commit()
        return result
    except requests.RequestException as e:
        print("service error", ";;;;", flush=True)
        print(e, flush=True)
        logger.warning(f"retrying {self.request.retries+1} due to request error  : {e}")
        if job is not None:
            job.retries = self.request.retries + 1
            job.status = JobStatus.RETRY

            db.commit()
        raise self.retry(exc=e)
    except Exception as e:
        self.update_state(state=JobStatus.FAILURE.value, meta={"progress": 10})

        if job is not None:
            job.status = JobStatus.FAILURE
            job.error = str(e)

            db.commit()
        raise e
    finally:
        db.close()
