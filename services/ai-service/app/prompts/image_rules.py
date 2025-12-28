# IMAGE_RULES = """IMAGE TEXT RULES:

# - Image text is platform-independent.
# - Use short, bold, readable text.
# - Each line must be under 40 characters.
# - Avoid punctuation-heavy sentences.
# - Use emojis According to tone.
# - Use 3 to 6 slides only.
# - Each slide must communicate one idea clearly.

# Output format:

# "visuals": [
#   {
#     "slide_index": 0,
#     "headline": "",
#     "subtext": ""
#   }
# ]
# """

IMAGE_RULES = """
<SECTION: IMAGE_CAROUSEL_RULES>
Goal: Create a 3-6 slide narrative arc from the blog content.
Slide structure:
- Slide 1: High-impact Hook (Problem/Question).
- Slide 2-5: Key value points or steps.
- Final Slide (The Closer): This slide MUST be a high-conversion call-to-action.

FINAL SLIDE LOGIC BY CTA_TYPE:
- READ_BLOG: Headline: "Want the full story?"; Subtext: "Read the complete guide at the link in our bio/caption."
- SIGN_UP: Headline: "Ready to start?"; Subtext: "Join the community today. Tap the link to sign up!"
- VISIT_WEBSITE: Headline: "Explore more"; Subtext: "Visit our site for more resources and tools."
- WATCH_VIDEO: Headline: "See it in action"; Subtext: "Watch the full video breakdown via the link."
- NONE
Constraint: 
- "headline": Bold, attention-grabbing (Max 40 chars).
- "subtext": Descriptive, value-add sentence (Max 80 chars). DO NOT provide 1-2 words.
</SECTION>
"""
