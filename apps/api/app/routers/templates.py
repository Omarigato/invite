from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.template import Template
from app.schemas.template import TemplateResponse

router = APIRouter(prefix="/api/v1/templates", tags=["templates"])


@router.get("", response_model=list[TemplateResponse])
async def list_templates(
    category_id: int | None = Query(None),
    theme_id: int | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(Template)
    if category_id:
        query = query.where(Template.category_id == category_id)
    if theme_id:
        query = query.where(Template.theme_id == theme_id)
    query = query.order_by(Template.sort_order)
    result = await db.execute(query)
    return [TemplateResponse.model_validate(t) for t in result.scalars().all()]


@router.get("/{template_id}", response_model=TemplateResponse)
async def get_template(template_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Template).where(Template.id == template_id))
    template = result.scalar_one_or_none()
    if not template:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Template not found")
    return TemplateResponse.model_validate(template)
