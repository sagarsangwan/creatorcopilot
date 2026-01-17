from flask import Blueprint, jsonify, g, request
from sqlalchemy.orm import Session
from app.models.daily_platform_usage import DailyPlatformUsage
from datetime import date

platform_usage_bp = Blueprint(
    "platform_usage", __name__, url_prefix="/api/v1/analytics/platform-usage"
)


@platform_usage_bp.route("/daily", methods=["GET"])
def daily_usage():
    db: Session = g.db
    date_ = request.args.get("date", default=date.today())
    print(date_, flush=True)
    data = db.query(DailyPlatformUsage).filter(DailyPlatformUsage.date == date_).all()
    return jsonify({"posts": [e.to_dict() for e in data]}), 200
