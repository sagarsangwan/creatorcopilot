from django.urls import path
from .views import google_login_gateway, refresh_token_refresh_gateway

urlpatterns = [
    path("auth/google/", google_login_gateway),
    path("auth/token/refresh/", refresh_token_refresh_gateway),
]
