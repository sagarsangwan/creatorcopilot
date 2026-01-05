from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


from core.authentication.jwt_auth import JWTAuthentication

import requests
from rest_framework.response import Response
from django.conf import settings

AUTH_BASE = settings.AUTH_SERVICE_URL
MEDIA_BASE = settings.MEDIA_SERVICE_URL
CONTENT_BASE = settings.CONTENT_BASE_URL


def get_headers(request):
    headers = {
        "X-User-Id": str(request.user.id),
        "X-User-Email": request.user.email,
        "Content-Type": "application/json",
    }
    return headers


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


@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated])
def content_post_list_create(request):
    headers = {
        "X-User-Id": str(request.user.id),
        "X-User-Email": request.user.email,
        "Content-Type": "application/json",
    }

    if request.method == "POST":
        payload = request.data
        res = requests.post(
            f"{CONTENT_BASE}/api/v1/content/posts",
            headers=headers,
            json=payload,
            timeout=10,
        )

        return Response(data=res.json(), status=res.status_code)
    if request.method == "GET":
        res = requests.get(
            f"{CONTENT_BASE}/api/v1/content/posts",
            headers=headers,
            params=request.GET,
            timeout=10,
        )
        return Response(data=res.json(), status=res.status_code)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_content_detais(request, content_id):
    headers = get_headers(request)
    job_type = request.query_params.get("job_type")
    params = {}
    if job_type:
        params["job_type"] = job_type
    res = requests.get(
        f"{CONTENT_BASE}/api/v1/content/posts/{content_id}",
        headers=headers,
        params=params,
        timeout=10,
    )

    return Response(data=res.json(), status=res.status_code)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_job_status(request, job_id):
    headers = get_headers(request=request)
    res = requests.get(
        f"{CONTENT_BASE}/api/v1/content/job/status/{job_id}",
        headers=headers,
        timeout=10,
    )
    return Response(data=res.json(), status=res.status_code)
