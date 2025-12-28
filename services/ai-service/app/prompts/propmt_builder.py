# from typing import Optional, List


# def build_prompt(
#     ctaType: str = "NONE",
#     title: str = "",
#     content: str = "",
#     ctaLink: str = None,
#     language: str = "en",
#     tone: Optional[str] = None,
#     audience: Optional[str] = None,
#     content_goal: Optional[str] = None,
#     platforms: Optional[List[str]] = None,
# ):
#     platforms = platforms or []

#     from app.prompts.system import SYSTEM_PROMPT
#     from app.prompts.image_rules import IMAGE_RULES

#     from app.prompts.platforms.instagram import INSTAGRAM_RULES
#     from app.prompts.platforms.facebook import FACEBOOK_RULES
#     from app.prompts.platforms.linkedin import LINKEDIN_RULES
#     from app.prompts.platforms.x import X_RULES
#     from app.prompts.platforms.threads import THREADS_RULES

#     PLATFORM_RULES_MAP = {
#         "instagram": INSTAGRAM_RULES,
#         "facebook": FACEBOOK_RULES,
#         "linkedin": LINKEDIN_RULES,
#         "x": X_RULES,
#         "threads": THREADS_RULES,
#     }

#     platform_blocks = []
#     for platform in platforms:
#         rule = PLATFORM_RULES_MAP.get(platform)
#         if rule:
#             platform_blocks.append(rule)

#     platform_rules = "\n\n".join(platform_blocks)

#     return f"""
#     {SYSTEM_PROMPT}

# LANGUAGE:
# {language}

# TONE:
# {tone}

# AUDIENCE:
# {audience}

# CONTENT GOAL:
# {content_goal}

# CTA:
# {ctaLink}

# CTA TYPE:
# {ctaType}

# BLOG CONTENT:
# {content}

# BLOG TITLE:
# {title}

# {IMAGE_RULES}

# {platform_rules}
# """.strip()


def build_prompt(
    ctaType: str,
    title: str,
    content: str,
    ctaLink: str,
    language: str,
    tone: str,
    audience: str,
    content_goal: str,
    platforms: list,
):
    platforms = platforms or []

    from app.prompts.system import SYSTEM_PROMPT
    from app.prompts.image_rules import IMAGE_RULES

    from app.prompts.platforms.instagram import INSTAGRAM_RULES
    from app.prompts.platforms.facebook import FACEBOOK_RULES
    from app.prompts.platforms.linkedin import LINKEDIN_RULES
    from app.prompts.platforms.x import X_RULES
    from app.prompts.platforms.threads import THREADS_RULES

    PLATFORM_RULES_MAP = {
        "instagram": INSTAGRAM_RULES,
        "facebook": FACEBOOK_RULES,
        "linkedin": LINKEDIN_RULES,
        "x": X_RULES,
        "threads": THREADS_RULES,
    }
    platform_rules = "\n".join([PLATFORM_RULES_MAP.get(p, "") for p in platforms])

    return f"""
{SYSTEM_PROMPT}

<INPUT_CONTEXT>
- Language: {language}
- Tone: {tone}
- Audience: {audience}
- Content Goal: {content_goal}
- CTA Type: {ctaType}
- CTA URL: {ctaLink}
- Blog Title: {title}
- Blog Content: {content}
</INPUT_CONTEXT>

{IMAGE_RULES}

<PLATFORM_SPECIFIC_INSTRUCTIONS>
{platform_rules}
</PLATFORM_SPECIFIC_INSTRUCTIONS>

<OUTPUT_JSON_SCHEMA>
Return this exact structure:
{{
  "visuals": [
    {{ "slide_index": 0, "headline": "string", "subtext": "string" }}
  ],
  "assets": [
    {{
      "platform": "string",
      "text": "Caption text goes here (Include CTA for LinkedIn/X only)",
      "meta_data": {{
        "hashtags": ["list"],
        "first_comment": "CTA + Link (For Instagram/Facebook only)",
        "cta_text": "Short CTA phrase"
      }}
    }}
  ]
}}
</OUTPUT_JSON_SCHEMA>
""".strip()
