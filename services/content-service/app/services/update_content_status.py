from app.models.content import ContentPost, ContentStatus


def update_content_status(
    db,
    content: ContentPost,
    status: ContentStatus | None = None,
    error: str | None = None,
):
    if status:
        content.status = status
    if error:
        content.error = error
    db.commit()
