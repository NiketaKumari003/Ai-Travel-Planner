from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import os
from sqlmodel import Session, select
from models import User, get_engine

security = HTTPBearer()
SECRET = os.environ.get('JWT_SECRET', 'dev_secret_change_me')
ALGORITHM = "HS256"

def get_current_user_optional(credentials: HTTPAuthorizationCredentials = Depends(lambda: None)):
    # optional auth for chat endpoint
    return None

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
    engine = get_engine()
    with Session(engine) as session:
        user = session.exec(select(User).where(User.id==user_id)).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
