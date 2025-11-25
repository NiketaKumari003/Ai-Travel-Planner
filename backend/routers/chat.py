from fastapi import APIRouter, Body, Depends, HTTPException
from pydantic import BaseModel
from services.ai_agent import ask_ai
from utils.auth import get_current_user_optional

router = APIRouter()

class ChatPayload(BaseModel):
    message: str

@router.post("/chat")
def chat(payload: ChatPayload, user=Depends(get_current_user_optional)):
    # ask the AI service (this is a placeholder that can be replaced with real AI integration)
    reply = ask_ai(payload.message, user_id=(user.id if user else None))
    return {"reply": reply, "input": payload.message}
