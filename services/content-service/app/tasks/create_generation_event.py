from app.schemas.analytics_service import EventBase
from celery.utils.log import get_task_logger
import requests
from app.core.config import settings
from app.celery_app import celery

logger = get_task_logger(__name__)


@celery.task(
    name="content.create_generation_event", bind=True, max_retries=3, track_started=True
)
def create_generation_event(self, payload: EventBase):
    try:
        res = requests.post(
            f"{settings.ANALYTICS_SERVICE_URL}/api/v1/event", json=payload, timeout=30
        )
        if res.status_code != 201:
            raise requests.RequestException(
                f"Event Service Failed:{res.status_code} {res.text}"
            )
    except requests.RequestException as e:
        logger.warning(f"retrying due to analytical service is un responsive {e}")
        if self.request.retries >= self.max_retries:
            raise
        raise self.retry(exc=e, countdown=30)
    return
