from app.models.jobs import JobStatus, ContentJob


def update_job_status(
    db,
    job: ContentJob,
    progress: int | None = None,
    status: JobStatus | None = None,
    error: str | None = None,
):
    if status:
        job.status = status
    if progress is not None:
        job.progress = progress
    if error:
        job.error = error
    db.commit()
