from typing import List
from pydantic import BaseModel, Field
from typing import Optional


class Visual(BaseModel):
    slide_index: int
    headline: str
    subtext: str


class MetaData(BaseModel):
    hashtags: Optional[List[str]] = []  # Field(default_factory=list)
    first_comment: Optional[str] = None
    cta_text: Optional[str] = None


class Asset(BaseModel):
    platform: str
    text: str
    meta_data: MetaData  # Maps to your nested meta_data object


class UsageMetadata(BaseModel):
    prompt_tokens: int
    candidates_tokens: int
    total_tokens: int
    cached_tokens: int


class AIServiceResponse(BaseModel):
    visuals: List[Visual]
    assets: List[Asset]
    ai_provider: str
    prompt_version: str
    model_version: str
    usage_metadata: UsageMetadata
