import os
from celery import Celery
from app.core.config import settings

celery = Celery(
    "content_service",
    broker=os.getenv(settings.CELERY_BROKER_URL),
    backend=os.getenv(settings.CELERY_RESULT_BACKEND),
    include=["app.tasks.generate_social_post_captions"],
)


celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Kolkata",
    enable_utc=False,
    task_track_started=True,
    worker_prefetch_multiplier=1,
    task_acks_late=True,
)

celery.autodiscover_tasks(["app"])
