from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session
from models import Booking, get_engine, create_db_and_tables
from utils.auth import get_current_user

create_db_and_tables()
router = APIRouter()

class BookingPayload(BaseModel):
    trip_id: int = None
    provider: str
    type: str  # flight or hotel
    details: dict = {}

@router.post("/book")
def book(payload: BookingPayload, user=Depends(get_current_user)):
    engine = get_engine()
    with Session(engine) as session:
        booking = Booking(user_id=user.id, trip_id=payload.trip_id, provider=payload.provider, type=payload.type, details=payload.details)
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return booking
