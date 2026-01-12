from app.models.jobs import JobStatus
from app.models.content import ContentStatus


def mark_job_and_content_retry(db, job, content, error: str):
    job.status = JobStatus.STARTED
    job.error = ""
    content.status = ContentStatus.PROCESSING
    db.commit()
