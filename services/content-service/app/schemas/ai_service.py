from typing import List
from pydantic import BaseModel, Field


class Visual(BaseModel):
    slide_index: int
    headline: str
    subtext: str


class MetaData(BaseModel):
    hashtags: List[str]
    first_comment: str
    cta_text: str


class Asset(BaseModel):
    platform: str
    text: str
    meta_data: MetaData  # Maps to your nested meta_data object


class UsageMetadata(BaseModel):
    prompt_tokens: int
    candidates_tokens: int
    total_tokens: int


class AIServiceResponse(BaseModel):
    visuals: List[Visual]
    assets: List[Asset]
    ai_provider: str
    prompt_version: str
    model_version: str
    usage_metadata: UsageMetadata
