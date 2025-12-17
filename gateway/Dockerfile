FROM python:3.11-slim



# Set environment variables



WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . /app/

EXPOSE 8000

# NOTE: In production, i have to use Gunicorn/Uvicorn, not runserver.

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]