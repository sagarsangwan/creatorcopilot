from fastapi import FastAPI, HTTPException, status
from pydantic import ValidationError
from httpx import AsyncClient
from jose import jwt

from config import settings
from security import create_access_token, create_refresh_token, verify_refresh_token
from models import (
    GoogleLoginRequest,
    TokenRefreshRequest,
    TokenResponse,
    UserResponse,
    UserInDB,
)

app = FastAPI()
client = AsyncClient()


# --- Dummy Database/User Management ---
# In a real app, this would query your actual database.
def get_or_create_user(
    email: str, first_name: str, last_name: str, image_url: str
) -> UserInDB:
    """Simulates looking up or creating a user in the DB based on Google info."""
    # Dummy logic: Always returns a created user with a static ID for this example
    # In production, you would check the DB and insert/update the user record.
    return UserInDB(
        id=123, email=email, first_name=first_name, last_name=last_name, image=image_url
    )


# --- Endpoints ---


@app.post("/auth/google/", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def google_login(request: GoogleLoginRequest):
    """
    Handles the Google ID token exchange for internal JWTs.
    Maps to the NEXTAUTH_BACKEND_URL/auth/google/ call in your signIn callback.
    """
    try:
        # 1. Verify Google ID Token
        # You should use a library like google-auth to fully verify the token against Google.
        # For simplicity and to match common Django social auth patterns, we'll use python-jose to decode and assume.
        # In a real app, use the official library and check the 'aud' field.
        google_payload = jwt.decode(
            request.token,
            key=settings.GOOGLE_CLIENT_ID,  # NOTE: This is an oversimplification!
            options={
                "verify_signature": False,
                "verify_aud": False,
            },  # DANGEROUS IN PROD, use real library
        )

        email = google_payload.get("email")
        name = google_payload.get("name")
        picture = google_payload.get("picture")
        first_name = google_payload.get("given_name")
        last_name = google_payload.get("family_name")

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google ID Token (missing email)",
            )

        # 2. Get or Create User
        db_user = get_or_create_user(email, first_name, last_name, picture)

        # 3. Create Internal JWTs
        token_data = {"user_id": db_user.id, "email": db_user.email}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)

        # 4. Format Response for NextAuth
        user_response = UserResponse(
            id=db_user.id,
            email=db_user.email,
            name=(
                name or f"{db_user.first_name} {db_user.last_name}"
                if db_user.first_name
                else db_user.email
            ),
            picture=db_user.image,
        )

        return TokenResponse(
            user=user_response, access=access_token, refresh=refresh_token
        )

    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid payload format: {e}",
        )
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid Google ID Token: {e}",
        )
    except Exception as e:
        print(f"Server error during login: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred.",
        )


@app.post(
    "/auth/token/refresh/", response_model=TokenResponse, status_code=status.HTTP_200_OK
)
async def token_refresh(request: TokenRefreshRequest):
    """
    Handles the exchange of a refresh token for a new access token.
    Maps to the NEXTAUTH_BACKEND_URL/auth/token/refresh/ call in your jwt callback.
    """
    # 1. Verify Refresh Token
    payload = verify_refresh_token(request.refresh)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 2. Create New Access Token
    token_data = {"user_id": payload["user_id"], "email": payload["email"]}
    new_access_token = create_access_token(token_data)

    # 3. Format Response for NextAuth
    # Note: We must return a TokenResponse object, even though only 'access' is typically needed.
    # Since we don't have the user object here, we'll create a dummy user object,
    # but the frontend only uses the 'access' token and existing 'user' data from the token.
    # In a real setup, you might fetch the user data here.

    # Placeholder User Response (access token is the critical part)
    dummy_user = UserResponse(
        id=payload["user_id"], email=payload["email"], name="Refreshed User"
    )

    return TokenResponse(
        user=dummy_user,
        access=new_access_token,
        refresh=request.refresh,  # Return the old refresh token, which is still valid
    )
