# /monorepo-root/auth-service/Dockerfile (Development Version)

# Use the full Python image for simplicity in dev
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy requirements file first (for efficient caching)
COPY requirements.txt /app/

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY app/ ./


# Expose the internal port
EXPOSE 8001

# Command to run FastAPI in development mode using Uvicorn's --reload flag
# The '--reload' flag watches the code in /app (via the volume mount) and restarts the server on changes.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]