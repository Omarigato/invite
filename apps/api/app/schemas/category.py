from pydantic import BaseModel


class CategoryResponse(BaseModel):
    id: int
    slug: str
    name_kk: str
    name_ru: str
    name_en: str
    cover_url: str
    description_kk: str | None
    description_ru: str | None
    description_en: str | None
    sort_order: int
    template_count: int = 0

    class Config:
        from_attributes = True
