from flask import Flask
from .app_factory import create_app
from app.core.config import settings

app = create_app()
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8005, debug=settings.DEBUG)
