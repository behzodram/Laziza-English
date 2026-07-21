from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.token import router as token_router

ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env.local")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",            # VS Code Live Server
        "http://localhost:5500",            # VS Code Live Server
        "http://16.171.31.78:8000",         # AWS EC2 instance
        "https://laziza-english.web.app/"   # Firebase Hosting
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(token_router)


@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Backend is running",
        "version": "1.1.1",
        "notes": "agent name update",
        "Project": "Laziza English"
    }