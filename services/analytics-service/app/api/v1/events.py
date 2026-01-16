from flask import Blueprint, jsonify, g, request
from sqlalchemy.orm import Session
from app.schemas.event_schemas import (
    EventCreateRequest,
    EventCreateResponse,
    EventsListResponse,
)
from pydantic import ValidationError
from app.models.generated_content_events import GenerationStatus, ContentGenerationEvent

events_bp = Blueprint("event", __name__, url_prefix="/api/v1/event")


@events_bp.route("", methods=(["POST", "GET"]))
def events():
    db: Session = g.db
    if request.method == "GET":
        data = db.query(ContentGenerationEvent).all()
        response_data = EventsListResponse(events=data, status_code=200)
        return jsonify(response_data.model_dump()), 200
    elif request.method == "POST":
        json_data = request.get_json()
        if not json_data:
            return jsonify({"message": "No data provided"}), 400
        try:
            event = EventCreateRequest(**request.get_json())
            print(event, flush=True)

            return jsonify({"message": "hi from event index"}), 201

        except ValidationError as e:
            return jsonify({"error": "Invalid Data Format", "Error": e.errors()}), 422
        except Exception as e:
            return jsonify({"error": "Interval server error"}), 500
