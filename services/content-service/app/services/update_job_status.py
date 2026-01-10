from app.models.jobs import JobStatus, ContentJob


def update_job_status(
    db,
    job: ContentJob,
    progress: int | None = None,
    status: JobStatus | None = None,
    error: str | None = None,
    retries: int | None = None,
):
    try:
        if status is not None:
            job.status = status
        if progress is not None:
            job.progress = progress
        if retries is not None:
            job.retries = retries
        if error is not None:
            job.error = error

        db.commit()

    except Exception:
        db.rollback()
        raise
