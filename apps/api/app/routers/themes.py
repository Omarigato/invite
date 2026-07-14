from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.theme import Theme
from app.schemas.theme import ThemeResponse

router = APIRouter(prefix="/api/v1/themes", tags=["themes"])


@router.get("", response_model=list[ThemeResponse])
async def list_themes(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Theme))
    return [ThemeResponse.model_validate(t) for t in result.scalars().all()]


@router.get("/{slug}", response_model=ThemeResponse)
async def get_theme(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Theme).where(Theme.slug == slug))
    theme = result.scalar_one_or_none()
    if not theme:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Theme not found")
    return ThemeResponse.model_validate(theme)
