from flask import Blueprint, jsonify, g, request
from sqlalchemy.orm import Session
from app.models.daily_platform_usage import DailyPlatformUsage
import datetime

platform_usage_bp = Blueprint(
    "platform_usage", __name__, url_prefix="/api/v1/analytics/platform-usage"
)


@platform_usage_bp.route("/daily", methods=["GET", "DELETE"])
def daily_usage():
    db: Session = g.db
    date_str = request.args.get("date")
    date_obj = datetime.datetime.strptime(date_str, "%d-%m-%Y").date()
    if request.method == "GET":
        data = (
            db.query(DailyPlatformUsage)
            .filter(DailyPlatformUsage.date == date_obj)
            .all()
        )
        return jsonify({"posts": [e.to_dict() for e in data]}), 200
    if request.method == "DELETE":
        try:
            deleted_count = (
                db.query(DailyPlatformUsage)
                .filter(DailyPlatformUsage.date == date_obj)
                .delete(synchronize_session="fetch")
            )
            db.commit()
            if deleted_count == 0:
                return jsonify({"message": f"No records found for {date_str}"}), 404

            return (
                jsonify(
                    {
                        "message": f"Successfully deleted {deleted_count} records for {date_str}"
                    }
                ),
                200,
            )
        except Exception as e:
            db.rollback()
            return jsonify({"message": "Internal Server Error", "error": str(e)}), 500
