import os
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

import jwt
from .user import SimpleUser


class JwtAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = self.headers.get("Authorization")
        JWT_PUBLIC_KEY = os.getenv("JWT_PUBLIC_KEY ")
        if not auth or auth.startswith("Bearer "):
            return None
        token = auth.split(" ")[1]
        try:
            payload = jwt.decode(
                token, JWT_PUBLIC_KEY, algorithms=["RS256"], audience="creatorcopilot"
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
