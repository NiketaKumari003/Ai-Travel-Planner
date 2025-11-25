from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = os.environ.get('JWT_SECRET', 'dev_secret_change_me')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60*24*7

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: int = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta or ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)
    return encoded_jwt
