from app.models.jobs import JobStatus
from app.models.content import ContentStatus


def mark_job_and_content_failed(db, job, content, error: str):
    job.status = JobStatus.FAILURE
    job.error = error
    content.status = ContentStatus.FAILED
    db.commit()
