from pydantic import BaseModel, Field


class GoogleLoginRequest(BaseModel):
    token: str = Field(..., description="Google id token")
    access_token: str | None = Field(None, description="Google Access Token (optional)")


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    picture: str | None
    emailVerified: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    user: UserResponse
    access: str
    refresh: str


class TokenRefreshRequest(BaseModel):
    refresh: str


class TokenRefreshResponse(BaseModel):
    access: str
