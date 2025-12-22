from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

import logging

from app.core.database import get_db

from app.core.security import (
    decode_google_id_token_secure,
    verify_refresh_token,
    create_access_token,
    create_refresh_token,
)
from app.db.user_model import DBUser

from app.schemas.auth_schemas import (
    UserResponse,
    TokenResponse,
    GoogleLoginRequest,
    TokenRefreshRequest,
)

router = APIRouter()
logger = logging.getLogger(__name__)


def get_or_create_user(
    email: str,
    first_name: str | None,
    last_name: str | None,
    image_url: str | None,
    db: Session,
) -> DBUser:
    dbuser = db.query(DBUser).filter(DBUser.email == email).first()

    if dbuser:
        return dbuser
    else:
        new_user = DBUser(
            email=email, first_name=first_name, last_name=last_name, image=image_url
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user


@router.post("/auth/google/", response_model=TokenResponse)
async def google_login(request: GoogleLoginRequest, db: Session = Depends(get_db)):
    try:
        google_payload = decode_google_id_token_secure(request.token)
        email = google_payload.get("email")
        first_name = google_payload.get("first_name")
        last_name = google_payload.get("last_name")
        picture = google_payload.get("picture")
        full_name = google_payload.get("name")

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google ID Token (missing email)",
            )
        dbuser = get_or_create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            image_url=picture,
            db=db,
        )
        token_data = {"user_id": dbuser.id, "email": dbuser.email}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)
        display_name = full_name or f"{dbuser.first_name} {dbuser.last_name}"
        user_response = UserResponse(
            id=dbuser.id,
            email=dbuser.email,
            name=display_name,
            picture=dbuser.image,
        )
        return TokenResponse(
            user=user_response, access=access_token, refresh=refresh_token
        )
    except ValueError as e:
        logger.error(f"Google ID Token Verification Error:{e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication Failed: {e}",
        )
    except Exception as e:
        logger.error(f"internal Server Error During Google Login:{e} ")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An UnExpected Error Occur",
        )


@router.post("/auth/token/refresh", response_model=TokenResponse)
async def token_refresh(request: TokenRefreshRequest):
    payload = verify_refresh_token(request.refresh)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Or Expired Token"
        )
    token_data = {"user_id": payload["user_id"], "email": payload["email"]}
    new_accessToken = create_access_token(token_data)

    dummy_userResponse = UserResponse(
        id=payload["user_id"],
        email=payload["email"],
        name="Refreshed User",
        picture=None,
    )
    return TokenResponse(
        user=dummy_userResponse, access=new_accessToken, refresh=request.refresh
    )
