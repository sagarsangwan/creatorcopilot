from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


from core.authentication.jwt_auth import JWTAuthentication

import requests
from rest_framework.response import Response
from django.conf import settings

AUTH_BASE = settings.AUTH_SERVICE_URL
MEDIA_BASE = settings.MEDIA_SERVICE_URL


@api_view(["POST"])
@permission_classes([AllowAny])
def google_login_gateway(request):
    res = requests.post(
        f"{AUTH_BASE}/api/v1/auth/google", json=request.data, timeout=10
    )
    return Response(res.json(), status=res.status_code)


@api_view(["POST"])
def refresh_token_refresh_gateway(request):
    res = requests.post(
        f"{AUTH_BASE}/api/v1/auth/token/refresh", json=request.data, timeout=10
    )

    return Response(res.json(), status=res.status_code)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def initiate_upload(request):
    payload = {
        **request.data,
        "user": {"id": request.user.id, "email": request.user.email},
    }

    res = requests.post(
        f"{MEDIA_BASE}/api/v1/media/initiate-upload", json=payload, timeout=10
    )
    return Response(res.json(), status=res.status_code)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_media(request):
    payload = {**request.data, "id": request.user.id, "email": request.user.email}
    res = requests.get(f"{MEDIA_BASE}/api/v1/media/", json=payload, timeout=10)
    return Response(res.json(), status=res.status_code)
