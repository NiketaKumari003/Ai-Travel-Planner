# AI Traveler Planner - Backend (FastAPI)

## Overview
Simple, ready-to-run backend for the AI Traveler Planner project.
Features:
- FastAPI app
- JWT auth (register/login)
- Endpoints: chat, plan-trip, search destinations, book flight/hotel, saved trips
- SQLite (SQLModel) for local dev

## Run locally
1. Create virtualenv and install:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # or .\venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
2. Copy `.env.example` to `.env` and set values
3. Start server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
4. API docs: http://localhost:8000/docs
