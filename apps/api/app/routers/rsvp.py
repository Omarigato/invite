from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.card import Card
from app.models.user import User
from app.models.rsvp import Rsvp
from app.schemas.rsvp import RsvpCreate, RsvpResponse

router = APIRouter(prefix="/api/v1/rsvp", tags=["rsvp"])


@router.post("", response_model=RsvpResponse)
async def submit_rsvp(data: RsvpCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Card).where(Card.id == data.card_id))
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    rsvp = Rsvp(
        card_id=data.card_id,
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


@router.get("/card/{card_id}", response_model=list[RsvpResponse])
async def list_rsvps(
    card_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    card_result = await db.execute(
        select(Card).where(Card.id == card_id, Card.user_id == user.id)
    )
    card = card_result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    result = await db.execute(
        select(Rsvp).where(Rsvp.card_id == card_id).order_by(Rsvp.created_at.desc())
    )
    return [RsvpResponse.model_validate(r) for r in result.scalars().all()]
