from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlmodel import Session, select
from models import User, get_engine, create_db_and_tables
from utils.security import get_password_hash, verify_password, create_access_token
import os

create_db_and_tables()
router = APIRouter()

class RegisterPayload(BaseModel):
    email: str
    password: str
    name: str = None

class LoginPayload(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(payload: RegisterPayload):
    engine = get_engine()
    with Session(engine) as session:
        existing = session.exec(select(User).where(User.email==payload.email)).first()
        if existing:
            raise HTTPException(status_code=400, detail="User already exists")
        user = User(email=payload.email, hashed_password=get_password_hash(payload.password), name=payload.name)
        session.add(user)
        session.commit()
        session.refresh(user)
        return {"id": user.id, "email": user.email, "name": user.name}

@router.post("/login")
def login(payload: LoginPayload):
    engine = get_engine()
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email==payload.email)).first()
        if not user or not verify_password(payload.password, user.hashed_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_access_token({"sub": str(user.id)})
        return {"access_token": token, "token_type": "bearer"}
