from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import requests
from rest_framework.response import Response
from django.conf import settings

AUTH_BASE = settings.AUTH_SERVICE_URL


@api_view(["POST"])
@permission_classes([AllowAny])
def google_login_gateway(request):
    res = requests.post(
        f"{AUTH_BASE}/api/v1/auth/google", json=request.data, timeout=10
    )
    return Response(res.json(), status=res.status_code)


@api_view(["POST"])
def refresh_token_refresh_gateway(request):
    print(request.data, "////////////////////////")
    res = requests.post(
        f"{AUTH_BASE}/api/v1/auth/token/refresh", json=request.data, timeout=10
    )

    return Response(res.json(), status=res.status_code)
