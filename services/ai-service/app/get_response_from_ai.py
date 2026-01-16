import google.generativeai as genai
import os
from app.core.config import settings
import json
import time

# from app.prompts.propmt_builder import build_prompt


def getblogCaptionsFromAi(blogCaptionPrompt):
    genai.configure(api_key=settings.GEMENI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")
    start_time = time.perf_counter()

    response = model.generate_content(blogCaptionPrompt)
    end_time = time.perf_counter()
    latency_ms = int((end_time - start_time) * 1000)

    print(response.usage_metadata, flush=True)
    ai_result = response.text
    ai_result = ai_result.replace("```json", "").replace("```", "").strip()
    ai_result = ai_result.replace("\u00a0", " ")
    parsed_ai_result = json.loads(ai_result)
    usage_data = {
        "prompt_tokens": int(response.usage_metadata.prompt_token_count),
        "candidates_tokens": int(response.usage_metadata.candidates_token_count),
        "total_tokens": (int(response.usage_metadata.total_token_count)),
        "cached_tokens": getattr(
            response.usage_metadata, "cached_content_token_count", 0
        ),
    }
    updated_ai_result = {
        **parsed_ai_result,
        "ai_provider": "gemini",
        "latency_ms": latency_ms,
        "prompt_version": "v1",
        "model_version": response.model_version,
        "usage_metadata": usage_data,
    }
    return updated_ai_result
