import os
import httpx

AI_API_KEY = os.environ.get('AI_API_KEY', None)

def ask_ai(message: str, user_id: int = None):
    # Placeholder implementation. Replace with real LLM call (OpenAI, Gemini, etc.).
    # Example: call OpenAI ChatCompletion or Google Gemini here.
    # For now, we simulate an intelligent response.
    reply = f"(AI) I understood: '{message}'.\nSuggested quick ideas: 1) Visit famous spots, 2) Try local food, 3) Relax.\n(This is a placeholder reply — plug in your AI provider.)"
    return reply
