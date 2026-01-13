from flask import Flask
from app.core.config import settings
from app.core.logging import set_up_logging
from app.api.v1.health import health_bp


def create_app() -> Flask:
    set_up_logging(service_name=settings.SERVICE_NAME)
    app = Flask(settings.SERVICE_NAME)
    app.config["DEBUG"] = settings.DEBUG
    register_blueprints(app)
    return app


def register_blueprints(app: Flask):
    app.register_blueprint(health_bp)
