from fastapi import APIRouter

from schemas.token import TokenRequest, TokenResponse
from services.livekit_service import create_access_token

router = APIRouter(prefix="/token", tags=["Token"])


@router.post("/", response_model=TokenResponse)
async def create_token(request: TokenRequest):
    return await create_access_token(
        identity=request.identity,
        room_name=request.room_name,
    )