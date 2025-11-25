from sqlmodel import SQLModel, Field, create_engine, Session
from sqlalchemy import Column, JSON
from typing import Optional, List
import os

DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///./ai_traveler.db')
engine = create_engine(DATABASE_URL, echo=False, connect_args={'check_same_thread': False} if DATABASE_URL.startswith('sqlite') else {})

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    name: Optional[str] = None

class Trip(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
    title: Optional[str] = None
    destination: str
    start_date: str
    end_date: str
    budget: Optional[float] = None
    
    # SQLAlchemy JSON columns
    interests_json: Optional[List[str]] = Field(default_factory=list, sa_column=Column(JSON))
    itinerary_json: Optional[List[dict]] = Field(default_factory=list, sa_column=Column(JSON))

class Booking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
    trip_id: Optional[int] = None
    provider: str = ''
    type: str = ''  # flight / hotel
    
    # SQLAlchemy JSON column
    details_json: Optional[dict] = Field(default_factory=dict, sa_column=Column(JSON))

def get_engine():
    return engine

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
