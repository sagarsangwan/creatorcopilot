# services/auth-service/alembic/env.py

import os
from dotenv import load_dotenv
from sqlalchemy import engine_from_config, pool

# 1. NEW IMPORTS
from app.db.user_model import Base  # Import your Base class
from app.core.config import settings

# --- EXISTING CODE ---
# target_metadata = None
# Change to point to your Base metadata:
target_metadata = Base.metadata

# --- NEW CODE (Load settings and database URL) ---
ALEMBIC_ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(ALEMBIC_ROOT_DIR, ".env")


def run_migrations_online():
    """Run migrations in 'online' mode."""
    # 2. Load Environment Variables (Ensure your .env is loaded)
    # Adjust path if .env is in project root, otherwise Alembic init creates it
    load_dotenv(ENV_PATH)
    # 3. Use your DATABASE_URL from your settings module
    configuration = config.get_section(config.config_ini_section)
    configuration["sqlalchemy.url"] = settings.DATABASE_URL

    # 4. Use the custom engine configuration
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            # Add this to pass Python objects in migration scripts
            literal_binds=True,
            dialect_opts={"paramstyle": "named"},
        )

        with context.begin_transaction():
            context.run_migrations()


# ... rest of the file ...
