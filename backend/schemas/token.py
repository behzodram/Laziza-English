from pydantic import BaseModel

class TokenRequest(BaseModel):
    identity: str
    room_name: str


class TokenResponse(BaseModel):
    success: bool
    livekit_url: str
    token: str
    expires_in: int