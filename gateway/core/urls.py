from django.urls import path
from .views import (
    google_login_gateway,
    refresh_token_refresh_gateway,
    initiate_upload,
    list_media,
    content_post_list_create,
    get_content_detais,
    get_job_status,
)

urlpatterns = [
    path("auth/google/", google_login_gateway),
    path("auth/token/refresh/", refresh_token_refresh_gateway),
    path("media/initiate-upload/", initiate_upload),
    path("media/", list_media),
    path("posts/", content_post_list_create),
    path("posts/<str:content_id>/", get_content_detais),
    path("job/status/<str:job_id>/", get_job_status),
]
