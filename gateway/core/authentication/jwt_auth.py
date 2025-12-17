import os
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

# import jwt
from jose import jwt

from .user import SimpleUser

# JWT_PUBLIC_KEY = os.getenv("JWT_PUBLIC_KEY").replace("\\n", "\n")
JWT_SECRET_KEY = settings.JWT_SECRET_KEY

print(JWT_SECRET_KEY)
if not JWT_SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY not set in environment")


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.headers.get("Authorization")
        if not auth or not auth.startswith("Bearer "):
            return None
        token = auth.split(" ")[1]
        try:
            payload = jwt.decode(
                token, JWT_SECRET_KEY, algorithms=["HS256"], audience="creatorcopilot"
            )
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("TOKEN_EXPIRED")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("INVALID_TOKEN")
        if "sub" not in payload:
            raise AuthenticationFailed("INVALID_TOKEN_PAYLOAD")
        print(payload)
        user = SimpleUser(id=payload["sub"], email=payload.get("email"))

        return (user, None)
