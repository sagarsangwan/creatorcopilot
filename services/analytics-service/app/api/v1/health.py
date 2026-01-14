from flask import Blueprint, jsonify, g
from sqlalchemy.orm import Session
from sqlalchemy import text

health_bp = Blueprint("health", __name__, url_prefix="/health")


@health_bp.route("", methods=["GET"])
def health():
    return jsonify({"message": "analytics service is running"})


@health_bp.route("/db", methods=["GET"])
def db_health():
    db: Session = g.db
    db.execute(text("SELECT 1"))
    return jsonify({"message": "db-analytical running"})
