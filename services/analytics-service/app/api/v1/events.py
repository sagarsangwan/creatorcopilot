from flask import Blueprint, jsonify, g, request
from sqlalchemy.orm import Session
from app.schemas.event_schemas import (
    EventCreateRequest,
    EventCreateResponse,
    EventsListResponse,
    EventDetails,
)
from pydantic import ValidationError
from app.models.generated_content_events import GenerationStatus, ContentGenerationEvent
from app.models.daily_platform_usage import DailyPlatformUsage
import datetime
from sqlalchemy import func, cast, Date


events_bp = Blueprint("event", __name__, url_prefix="/api/v1/event")


@events_bp.route("", methods=(["POST", "GET"]))
def events():
    db: Session = g.db
    if request.method == "GET":

        data = db.query(ContentGenerationEvent).all()
        return jsonify({"events": [e.to_dict() for e in data]}), 200
    elif request.method == "POST":
        json_data = request.get_json()
        if not json_data:
            return jsonify({"message": "No data provided"}), 400
        try:
            event = EventCreateRequest(**request.get_json())
            new_event = ContentGenerationEvent(**event.model_dump())
            print(event, flush=True)
            db.add(new_event)
            db.commit()
            db.refresh(new_event)
            response = EventCreateResponse(message="Event Created", status_code=201)
            return jsonify(response.model_dump()), 201

        except ValidationError as e:
            return jsonify({"error": "Invalid Data Format", "Error": e.errors()}), 422
        except Exception as e:
            return jsonify({"error": "Interval server error"}), 500


@events_bp.route("/group-today-events", methods=["POST"])
def group_today_events():
    db: Session = g.db
    if request.method == "POST":
        date_str = request.args.get("date")
        date_obj = datetime.datetime.strptime(date_str, "%d-%m-%Y").date()
        try:
            already_generated = (
                db.query(DailyPlatformUsage)
                .filter(DailyPlatformUsage.date == date_obj)
                .first()
            )

            if already_generated:
                return jsonify({"message": f"Already generated for {date_obj}"}), 403
            LinkedIn = DailyPlatformUsage(
                date=date_obj,
                platform="LinkedIn",
                total_post_generated=0,
                total_token_used=0,
                total_latency_ms=0,
            )
            print(LinkedIn, flush=True)
            Instagram = DailyPlatformUsage(
                date=date_obj,
                platform="Instagram",
                total_post_generated=0,
                total_token_used=0,
                total_latency_ms=0,
            )
            all_dates = db.query(
                func.distinct(cast(ContentGenerationEvent.created_at, Date))
            ).all()
            print(f"Dates available in DB: {all_dates}", flush=True)
            events = (
                db.query(ContentGenerationEvent)
                .filter(cast(ContentGenerationEvent.created_at, Date) == date_obj)
                .all()
            )
            print(events, "/////////", flush=True)
            for event in events:
                if event.platform == "LinkedIn":
                    LinkedIn.total_post_generated += 1
                    LinkedIn.total_token_used += event.token_used
                    LinkedIn.total_latency_ms += event.latency_ms
                elif event.platform == "Instagram":
                    Instagram.total_latency_ms += event.latency_ms
                    Instagram.total_post_generated += 1
                    Instagram.total_token_used += event.token_used
            db.add_all([LinkedIn, Instagram])
            db.commit()

            return jsonify({"message": f"Successfully updated {date_obj} data"}), 201

        except Exception as e:
            db.rollback()
            return jsonify({"Message": "Internal Server Error", "error": str(e)}), 500

    else:
        return jsonify({"Message": "Method not allowd"}), 403
