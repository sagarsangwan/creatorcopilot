from flask import Flask, g
from app.core.config import settings
from app.core.logging import set_up_logging
from app.api.v1.health import health_bp
from app.core.database import SessionLocal


def create_app() -> Flask:
    set_up_logging(service_name=settings.SERVICE_NAME)
    app = Flask(settings.SERVICE_NAME)
    app.config["DEBUG"] = settings.DEBUG
    register_blueprints(app)

    @app.before_request
    def open_db_session():
        g.db = SessionLocal()

    @app.teardown_request
    def close_db_session(exception=None):
        db = g.pop("db", "")
        if db is not None:
            db.close()

    return app


def register_blueprints(app: Flask):
    app.register_blueprint(health_bp)
