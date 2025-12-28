import google.generativeai as genai
import os
from app.core.config import settings
import json

# from app.prompts.propmt_builder import build_prompt


def getblogCaptionsFromAi(blogCaptionPrompt):
    blogCaptionPrompt = blogCaptionPrompt
    # Load Google Gemini API key
    genai.configure(api_key=settings.GEMENI_API_KEY)

    # Set up Gemini AI model
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(blogCaptionPrompt)
    ai_result = response.text
    # Remove code block markers and strip whitespace
    ai_result = ai_result.replace("```json", "").replace("```", "").strip()

    # replace non breaking spaces.
    ai_result = ai_result.replace("\u00a0", " ")
    # Parse AI response
    parsed_ai_result = json.loads(ai_result)
    return parsed_ai_result
