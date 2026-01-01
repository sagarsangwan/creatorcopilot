import google.generativeai as genai
import os
from app.core.config import settings
import json

# from app.prompts.propmt_builder import build_prompt


def getblogCaptionsFromAi(blogCaptionPrompt):
    genai.configure(api_key=settings.GEMENI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(blogCaptionPrompt)

    print(response.usage_metadata)
    print("??????????????????????????")
    print(response)
    ai_result = response.text
    ai_result = ai_result.replace("```json", "").replace("```", "").strip()
    ai_result = ai_result.replace("\u00a0", " ")
    parsed_ai_result = json.loads(ai_result)
    usage_data = {
        "prompt_tokens": response.usage_metadata.prompt_token_count,
        "candidates_tokens": response.usage_metadata.candidates_token_count,
        "total_tokens": response.usage_metadata.total_token_count,
    }
    updated_ai_result = {
        **parsed_ai_result,
        "ai_provider": "gemini",
        "prompt_version": "v1",
        "model_version": response.model_version,
        "usage_metadata": usage_data,
    }
    return updated_ai_result
