# AI Traveler Planner - Fullstack (Frontend + Backend + Docker Compose)

## Quickstart (without Docker)
- Backend:
  ```bash
  cd backend
  python -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  cp .env.example .env
  uvicorn main:app --reload --port 8000
  ```
- Frontend (dev with Vite):
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

## Quickstart (Docker Compose)
```bash
docker compose up --build
```
- Backend will be available at http://localhost:8000
- Frontend will be at http://localhost:3000

Note: This is a starter template. Add your AI provider key to backend `.env` (AI_API_KEY) and adjust settings for production.
