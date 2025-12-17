from datetime import timedelta, timezone, datetime
from jose import JWTError, jwt
from app.core.config import settings
from google.oauth2 import id_token
from google.auth.transport.requests import (
    Request as GoogleAuthRequest,
)  # Alias to avoid conflict with FastAPI/httpx

google_request = GoogleAuthRequest()


def create_access_token(data: dict):
    to_encode = data.copy()
    print(to_encode, "beforeeeeeeeeeeee")
    expire = datetime.now((timezone.utc)) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    expire_timestamp = int(expire.timestamp())
    to_encode.update({"expire": expire_timestamp, "type": "access"})
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM
    )
    print(encoded_jwt, "mmmmmmmmmmmmmm")
    return encoded_jwt


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        days=settings.REFRESH_TOKEN_EXPIRE_DAYS
    )
    expire_timestamp = int(expire.timestamp())
    to_encode.update({"exp": expire_timestamp, "type": "refresh"})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM,
    )
    return encoded_jwt


def decode_token(token: str):
    try:
        payload = jwt.decode(
            token=token, key=settings.JWT_SECRET_KEY, algorithms=settings.JWT_ALGORITHM
        )
        return payload
    except JWTError:
        return None


def verify_refresh_token(refresh_token: str):
    payload = decode_token(refresh_token)
    print(payload)
    if payload and payload.get("type") == "refresh":
        return payload
    return None


def decode_google_id_token_secure(id_token_str: str) -> dict:
    """
    Decodes and securely verifies the Google ID token signature, audience, and expiry.
    """
    try:
        # verify_oauth2_token handles:
        # 1. Fetching Google's public keys (certs) from Google endpoint.
        # 2. Verifying the token signature using the correct key.
        # 3. Checking that the 'aud' claim matches our client ID.
        # 4. Checking the 'exp' (expiry) claim.
        id_info = id_token.verify_oauth2_token(
            id_token_str, google_request, settings.GOOGLE_CLIENT_ID
        )

        # The 'iss' (issuer) claim must be one of the following:
        if id_info["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Wrong issuer.")

        return id_info

    except ValueError as e:
        # This catches invalid signatures, expired tokens, audience mismatch, etc.
        raise ValueError(f"Google ID Token verification failed: {e}")
    except Exception as e:
        # This catches network errors when fetching Google's certs
        raise ValueError(f"Error during Google cert fetch: {e}")
