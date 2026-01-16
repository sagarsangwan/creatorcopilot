```md
# CreatorCopilot

CreatorCopilot helps creators generate social media captions and hashtags from blogs or text for platforms like LinkedIn, Instagram, and X.

## What it does

- Google login
- Paste blog or text
- Generate captions and hashtags using AI
- Track content and background jobs
- Simple dashboard

## Tech stack

- Frontend: Next.js, Tailwind CSS, shadcn/ui
- API Gateway: Django, Django REST Framework
- Services: FastAPI
- Database: PostgreSQL
- Background jobs: Celery, Redis
- Docker, Docker Compose

## Folder structure

```

creatorcopilot/
├── gateway/
├── services/
│   ├── auth-service/
│   ├── content-service/
│   ├── ai-service/
│   └── analytics-service/
├── frontend/
├── docker-compose.yml
├── .env.sample
└── README.md

```

## Environment variables

All environment variables are defined in `.env.sample`.

Copy it and create your own `.env` files before running the project.

Each service also has its own `.env.sample`.

## Run backend (Docker)

```

docker compose up --build

```

To stop:

```

docker compose down

```

## Run frontend

```

cd frontend
npm install
npm run dev

```

Frontend runs on:

```

[http://localhost:3000](http://localhost:3000)

```

## Services

### API Gateway
- Entry point
- Handles auth
- Routes requests

### Auth Service
- Google login
- Token validation

### Content Service
- Stores content
- Manages jobs

### AI Service
- Generates captions and hashtags

### Analytics Service
- Tracks usage
```

If **this** still breaks in preview, then your editor is **not rendering Markdown at all** — GitHub will render this correctly.
