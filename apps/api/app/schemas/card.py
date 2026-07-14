from datetime import datetime
from pydantic import BaseModel


class ScheduleItem(BaseModel):
    time: str
    title: str


class CardCreate(BaseModel):
    template_id: int
    theme_id: int
    category_id: int
    title: str


class CardUpdate(BaseModel):
    title: str | None = None
    fields: dict | None = None
    schedule: list[ScheduleItem] | None = None
    photos: list[str] | None = None
    music_url: str | None = None
    promo_code: str | None = None


class CardResponse(BaseModel):
    id: int
    user_id: int
    template_id: int
    theme_id: int
    category_id: int
    title: str
    slug: str
    custom_slug: str | None
    status: str
    fields: dict | None
    photos: list | None
    music_url: str | None
    schedule: list | None
    promo_code: str | None
    published_at: datetime | None
    created_at: datetime
    rsvp_count: int = 0

    class Config:
        from_attributes = True


class CardPublicResponse(BaseModel):
    id: int
    title: str
    slug: str
    fields: dict | None
    photos: list | None
    music_url: str | None
    schedule: list | None
    promo_code: str | None
    theme: dict | None = None
    category: dict | None = None

    class Config:
        from_attributes = True
