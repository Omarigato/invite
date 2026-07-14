from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.models.category import Category
from app.models.template import Template
from app.schemas.category import CategoryResponse

router = APIRouter(prefix="/api/v1/categories", tags=["categories"])


@router.get("", response_model=list[CategoryResponse])
async def list_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Category).order_by(Category.sort_order)
    )
    categories = result.scalars().all()

    response = []
    for cat in categories:
        count_result = await db.execute(
            select(func.count(Template.id)).where(Template.category_id == cat.id)
        )
        count = count_result.scalar() or 0
        cat_data = CategoryResponse.model_validate(cat)
        cat_data.template_count = count
        response.append(cat_data)

    return response
