from pydantic import BaseModel


class TemplateResponse(BaseModel):
    id: int
    category_id: int
    theme_id: int
    name: str
    preview_url: str | None
    is_premium: bool
    sort_order: int

    class Config:
        from_attributes = True
