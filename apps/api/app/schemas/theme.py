from pydantic import BaseModel


class ThemeResponse(BaseModel):
    id: int
    slug: str
    name: str
    description: str | None
    is_premium: bool
    thumbnail_url: str | None

    class Config:
        from_attributes = True
