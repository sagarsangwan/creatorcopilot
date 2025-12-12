from pydantic import BaseModel, Field


class GoogleLoginRequest(BaseModel):
    token: str = Field(..., description="Google id token")
    access_token: str | None = Field(None, description="Google Access Token (optional)")


class Userresonse(BaseModel):
    id: int
    name: str
    email: str
    picture: str | None


class TokenResponse(BaseModel):
    user: Userresonse
    access: str
    refresh: str
