from app.schemas.ai_service import AIServiceResponse
from app.models.jobs import JobStatus, ContentJob
from app.models.content import ContentPost, ContentStatus
from uuid import UUID
from app.schemas.ai_service import AIServiceResponse
from app.core.database import SessionLocal
from app.models.visual_assest import VisualAsset
from app.models.generated_assets import GeneratedAsset
from app.celery_app import celery
from app.services.update_job_status import update_job_status
from app.services.update_content_status import update_content_status


def add_job_metadata(db, job, result: AIServiceResponse):
    job.ai_provider = result.ai_provider
    job.model_version = result.model_version
    job.prompt_version = result.prompt_version
    job.usage_metadata = result.usage_metadata.model_dump()


def add_visuals(db, job_id, content_id, result: AIServiceResponse):
    for visual in result.visuals:
        new_visual = VisualAsset(
            content_post_id=content_id,
            job_id=job_id,
            slide_index=visual.slide_index,
            headline=visual.headline,
            subtext=visual.subtext,
        )
        db.add(new_visual)


def add_assets(db, job_id, content_id, result: AIServiceResponse):
    for asset in result.assets:
        new_assest = GeneratedAsset(
            content_post_id=content_id,
            job_id=job_id,
            platform=asset.platform,
            text=asset.text,
            meta_data=asset.meta_data,
        )
        db.add(new_assest)


@celery.task(
    name="content.save_ai_json_data_to_db", bind=True, max_retries=3, track_started=True
)
def save_ai_json_data_to_db(job_id: str):
    db = SessionLocal()

    try:
        jobId = UUID(job_id)
        job = db.query(ContentJob).filter(ContentJob.id == jobId).first()
        content = (
            db.query(ContentPost).filter(ContentPost.id == job.content_post_id).first()
        )
        if not job:
            raise Exception("Job not exist")
        ai_result = AIServiceResponse(**job.raw_ai_response)
        add_assets(
            db=db, job_id=jobId, content_id=job.content_post_id, result=ai_result
        )
        update_job_status(db=db, job=job, progress=70, status=JobStatus.STARTED)

        add_visuals(
            db=db, job_id=jobId, content_id=job.content_post_id, result=ai_result
        )
        update_job_status(db=db, job=job, progress=80, status=JobStatus.STARTED)

        add_job_metadata(db=db, job=job, result=ai_result)
        update_job_status(db=db, job=job, progress=100, status=JobStatus.SUCCESS)

        update_content_status(status=ContentStatus.GENERATED, db=db, content=content)
        db.commit()
        return
    except Exception as a:
        return
