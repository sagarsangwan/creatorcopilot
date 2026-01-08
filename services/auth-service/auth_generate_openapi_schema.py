import json
from app.main import app


def generate_schema():
    # Force FastAPI to generate the schema
    # This captures all routes included via app.include_router()
    openapi_data = app.openapi()

    with open("auth_service_openapi.json", "w") as f:
        json.dump(openapi_data, f, indent=2)

    print(
        "✅ Successfully generated openapi.json with",
        len(openapi_data.get("paths", {})),
        "routes.",
    )


if __name__ == "__main__":
    generate_schema()
