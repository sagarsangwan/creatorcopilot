from app.celery_app.celery import celery


@celery.task(name="content.ping")
def ping():
    return "pong"
