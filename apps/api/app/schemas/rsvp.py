from datetime import datetime
from pydantic import BaseModel


class RsvpCreate(BaseModel):
    card_id: int
    guest_name: str
    guest_phone: str | None = None
    guest_count: int = 1
    attending: bool
    message: str | None = None


class RsvpResponse(BaseModel):
    id: int
    card_id: int
    guest_name: str
    guest_phone: str | None
    guest_count: int
    attending: bool
    message: str | None
    created_at: datetime

    class Config:
        from_attributes = True
