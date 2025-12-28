import os
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

# import jwt
from jose import jwt, JWTError, exceptions

from .user import SimpleUser

# JWT_PUBLIC_KEY = os.getenv("JWT_PUBLIC_KEY").replace("\\n", "\n")
JWT_SECRET_KEY = settings.JWT_SECRET_KEY

if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY not set in environment")


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get("Authorization")
        if not auth or not auth.startswith("Bearer "):
            return None
        parts = auth.split(" ")
        if len(parts) != 2:
            raise AuthenticationFailed("MALFORMED_AUTH_HEADER")
        token = parts[1]
        if not token:
            raise AuthenticationFailed("INVALID_TOKEN_FORMAT")

        try:
            payload = jwt.decode(
                token, JWT_SECRET_KEY, algorithms=["HS256"], audience="creatorcopilot"
            )
        except exceptions.ExpiredSignatureError:
            raise AuthenticationFailed("TOKEN_EXPIRED")
        except JWTError:
            raise AuthenticationFailed("INVALID_TOKEN")
        if "user_id" not in payload:
            raise AuthenticationFailed("INVALID_TOKEN_PAYLOAD")

        user = SimpleUser(id=payload["user_id"], email=payload.get("email"))

        return (user, None)
