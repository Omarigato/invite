import secrets
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.core.deps import get_current_user
from app.core.config import settings
from app.models.user import User
from app.models.card import Card, CardStatus
from app.models.rsvp import Rsvp
from app.schemas.card import CardCreate, CardUpdate, CardResponse, CardPublicResponse

router = APIRouter(prefix="/api/v1/cards", tags=["cards"])


def generate_slug() -> str:
    return secrets.token_urlsafe(6)[:8]


@router.post("", response_model=CardResponse)
async def create_card(
    data: CardCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    card = Card(
        user_id=user.id,
        template_id=data.template_id,
        theme_id=data.theme_id,
        category_id=data.category_id,
        title=data.title,
        slug=generate_slug(),
        fields={},
        photos=[],
        schedule=[],
    )
    db.add(card)
    await db.commit()
    await db.refresh(card)
    return CardResponse.model_validate(card)


@router.get("", response_model=list[CardResponse])
async def list_my_cards(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Card).where(Card.user_id == user.id).order_by(Card.created_at.desc())
    )
    cards = result.scalars().all()
    response = []
    for card in cards:
        rsvp_count_result = await db.execute(
            select(func.count(Rsvp.id)).where(Rsvp.card_id == card.id)
        )
        rsvp_count = rsvp_count_result.scalar() or 0
        card_data = CardResponse.model_validate(card)
        card_data.rsvp_count = rsvp_count
        response.append(card_data)
    return response


@router.get("/{card_id}", response_model=CardResponse)
async def get_card(
    card_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Card).where(Card.id == card_id, Card.user_id == user.id)
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return CardResponse.model_validate(card)


@router.put("/{card_id}", response_model=CardResponse)
async def update_card(
    card_id: int,
    data: CardUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Card).where(Card.id == card_id, Card.user_id == user.id)
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(card, key, value)

    await db.commit()
    await db.refresh(card)
    return CardResponse.model_validate(card)


@router.post("/{card_id}/publish", response_model=CardResponse)
async def publish_card(
    card_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Card).where(Card.id == card_id, Card.user_id == user.id)
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    card.status = CardStatus.published
    card.published_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(card)
    return CardResponse.model_validate(card)


@router.delete("/{card_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_card(
    card_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Card).where(Card.id == card_id, Card.user_id == user.id)
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    await db.delete(card)
    await db.commit()


@router.post("/{card_id}/photos")
async def upload_photo(
    card_id: int,
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Card).where(Card.id == card_id, Card.user_id == user.id)
    )
    card = result.scalar_one_or_none()
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")

    ext = file.filename.split(".")[-1] if "." in (file.filename or "") else "jpg"
    filename = f"{secrets.token_hex(16)}.{ext}"
    upload_path = settings.UPLOAD_DIR / filename

    content = await file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File too large")

    with open(upload_path, "wb") as f:
        f.write(content)

    photo_url = f"/uploads/{filename}"
    photos = card.photos or []
    photos.append(photo_url)
    card.photos = photos
    await db.commit()

    return {"url": photo_url, "photos": photos}
