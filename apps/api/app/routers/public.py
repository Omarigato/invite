from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.card import Card, CardStatus
from app.models.rsvp import Rsvp
from app.schemas.card import CardPublicResponse
from app.schemas.rsvp import RsvpCreate, RsvpResponse

router = APIRouter(prefix="/api/v1", tags=["public"])


@router.get("/i/{slug}")
async def get_public_invitation(slug: str, db: AsyncSession = Depends(get_db)):
    """Get published invitation by slug (public, no auth)"""
    result = await db.execute(
        select(Card).where(
            (Card.slug == slug) | (Card.custom_slug == slug),
            Card.status == CardStatus.published,
        )
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Invitation not found")

    # Get RSVP stats
    rsvp_result = await db.execute(select(Rsvp).where(Rsvp.card_id == card.id))
    rsvps = rsvp_result.scalars().all()
    total_guests = sum(r.guest_count for r in rsvps if r.attending)

    return {
        "card": {
            "id": card.id,
            "title": card.title,
            "slug": card.slug,
            "fields": card.fields,
            "photos": card.photos,
            "music_url": card.music_url,
            "schedule": card.schedule,
            "promo_code": card.promo_code,
            "theme": {"slug": card.theme.slug, "name": card.theme.name} if card.theme else None,
            "category": {"slug": card.category.slug, "name_ru": card.category.name_ru} if card.category else None,
        },
        "rsvp_stats": {
            "total_invited": len(rsvps),
            "total_guests": total_guests,
        },
    }


@router.post("/i/{slug}/rsvp", response_model=RsvpResponse)
async def submit_public_rsvp(slug: str, data: RsvpCreate, db: AsyncSession = Depends(get_db)):
    """Submit RSVP for a public invitation"""
    result = await db.execute(
        select(Card).where(
            (Card.slug == slug) | (Card.custom_slug == slug),
            Card.status == CardStatus.published,
        )
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Invitation not found")

    rsvp = Rsvp(
        card_id=card.id,
        guest_name=data.guest_name,
        guest_phone=data.guest_phone,
        guest_count=data.guest_count,
        attending=data.attending,
        message=data.message,
    )
    db.add(rsvp)
    await db.commit()
    await db.refresh(rsvp)
    return RsvpResponse.model_validate(rsvp)
