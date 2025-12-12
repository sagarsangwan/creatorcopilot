from django.urls import path
from .views import google_login_gateway

urlpatterns = [path("auth/google/", google_login_gateway)]
