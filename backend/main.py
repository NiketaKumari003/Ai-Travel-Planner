from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, chat, trips, bookings, destinations
import uvicorn

app = FastAPI(title="AI Traveler Planner - Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(trips.router, prefix="/api", tags=["trips"])
app.include_router(bookings.router, prefix="/api", tags=["bookings"])
app.include_router(destinations.router, prefix="/api", tags=["destinations"])


@app.get("/")
def root():
    return {"message": "AI Traveler Planner Backend running"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
