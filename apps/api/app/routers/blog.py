from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.blog_post import BlogPost
from app.schemas.blog import BlogPostResponse, BlogPostListResponse

router = APIRouter(prefix="/api/v1/blog", tags=["blog"])


@router.get("", response_model=list[BlogPostListResponse])
async def list_posts(
    locale: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    query = select(BlogPost).order_by(BlogPost.created_at.desc())
    if locale:
        query = query.where(BlogPost.locale == locale)
    result = await db.execute(query)
    posts = result.scalars().all()

    response = []
    for post in posts:
        data = BlogPostListResponse.model_validate(post)
        # Strip HTML for excerpt
        import re
        clean = re.sub(r"<[^>]+>", "", post.body)
        data.excerpt = clean[:200] + "..." if len(clean) > 200 else clean
        response.append(data)

    return response


@router.get("/{slug}", response_model=BlogPostResponse)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return BlogPostResponse.model_validate(post)
