from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from models import Trip, get_engine, create_db_and_tables, User
from utils.auth import get_current_user, get_current_user_optional

create_db_and_tables()
router = APIRouter()

class PlanPayload(BaseModel):
    title: str = None
    destination: str
    start_date: str
    end_date: str
    budget: float = None
    interests: list = []

@router.post("/plan-trip")
def plan_trip(payload: PlanPayload, user = Depends(get_current_user_optional)):
    engine = get_engine()
    with Session(engine) as session:
        # Use user_id=1 for demo purposes if no user is logged in
        user_id = user.id if user else 1
        trip = Trip(title=payload.title or f"Trip to {payload.destination}", user_id=user_id,
                    destination=payload.destination, start_date=payload.start_date, end_date=payload.end_date,
                    budget=payload.budget, interests_json=payload.interests, itinerary_json=[{"day":1,"plan":"Sample"}])
        session.add(trip)
        session.commit()
        session.refresh(trip)
        return trip

@router.get("/trips")
def list_trips(user: User = Depends(get_current_user)):
    engine = get_engine()
    with Session(engine) as session:
        trips = session.exec(select(Trip).where(Trip.user_id==user.id)).all()
        return trips
