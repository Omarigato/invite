from datetime import datetime
from pydantic import BaseModel


class BlogPostResponse(BaseModel):
    id: int
    slug: str
    title: str
    body: str
    cover_url: str | None
    locale: str
    seo_title: str | None
    seo_description: str | None
    created_at: datetime

    class Config:
        from_attributes = True


class BlogPostListResponse(BaseModel):
    id: int
    slug: str
    title: str
    cover_url: str | None
    locale: str
    created_at: datetime
    excerpt: str = ""

    class Config:
        from_attributes = True
