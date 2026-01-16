---

# CreatorCopilot

I built **CreatorCopilot** to solve a simple problem: turning long-form blogs into social media posts shouldn't be a manual chore. You paste your text, and the app handles the breakdown into captions and hashtags for platforms like LinkedIn, X, and Instagram.

The goal wasn't just to make a tool, but to build it using a **microservice architecture** that reflects how real-world apps are structured.

## What it actually does

* **Sign in:** Jump in quickly with Google Auth.
* **Convert:** Paste a blog link or raw text and get platform-ready captions.
* **Track:** Manage your content "jobs" and see what’s ready to post.
* **Scale:** Since it's built with microservices, each part (AI, Auth, Analytics) runs independently.

---

## The Tech Behind It

I chose this stack to balance speed with a "production-grade" feel:

* **Frontend:** Next.js (App Router), Tailwind, and shadcn/ui.
* **The Gateway:** Django + DRF (serves as the main entry point).
* **Microservices:** FastAPI/Flask (fast, lightweight, and great for AI/Auth/Analytics).
* **Data:** PostgreSQL (each service has its own dedicated database).
* **Background Jobs:** Celery & Redis (to keep the AI generation from freezing the UI).
* **DevOps:** Docker & Docker Compose for easy local setup.

---

## Project Structure

The project is organized so you can work on one service without breaking the others:

```text
creatorcopilot/
├── gateway/           # The "front door" for all API requests
├── services/
│   ├── auth-service/      # Handles users & Google login
│   ├── content-service/   # Manages your posts and drafts
│   ├── ai-service/        # The logic for generating captions
│   └── analytics-service/ # Tracks how the app is being used
├── frontend/          # Next.js dashboard
└── docker-compose.yml # Spins up the whole ecosystem

```

---

## Getting Started

### 1. Environment Variables

I've included `.env.sample` files in the root and inside each service folder. Copy those to a real `.env` file and add your own keys (like Google Auth or AI API keys).

### 2. Spin up the Backend (Docker)

Make sure you have Docker installed, then run:

```bash
docker compose up --build

```

This starts the gateway, all 4 services, the databases, and the background workers.

### 3. Run the Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev

```

Head over to `http://localhost:3000` to see it in action.

---

## Why microservices?

I didn't want a "monolith." Using microservices because Real-world practice It mimics how modern tech companies actually ship software.

## What's Next?

* [ ] Adding better error handling (retries for failed AI jobs).
* [ ] Adding a "History" edit view to edit generations.
* [ ] Centralized logging to see what's happening across all services at once.
* [ ] Complete analyticl service for admin use like what is count for total ai generation today or like how many posts are generated for insta/linkdin/X.

**Built by Sagar Sangwan**

---
