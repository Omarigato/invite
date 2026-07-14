from datetime import datetime
from sqlalchemy import String, Boolean, Integer, ForeignKey, JSON, DateTime, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from app.core.database import Base
from app.models.base import TimestampMixin


class CardStatus(str, enum.Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class Card(Base, TimestampMixin):
    __tablename__ = "cards"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    template_id: Mapped[int] = mapped_column(ForeignKey("templates.id"), nullable=False)
    theme_id: Mapped[int] = mapped_column(ForeignKey("themes.id"), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    custom_slug: Mapped[str | None] = mapped_column(String(100), unique=True)
    status: Mapped[CardStatus] = mapped_column(SAEnum(CardStatus), default=CardStatus.draft)
    fields: Mapped[dict | None] = mapped_column(JSON, default=dict)
    photos: Mapped[list | None] = mapped_column(JSON, default=list)
    music_url: Mapped[str | None] = mapped_column(String(500))
    schedule: Mapped[list | None] = mapped_column(JSON, default=list)
    promo_code: Mapped[str | None] = mapped_column(String(50))
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user = relationship("User", back_populates="cards")
    template = relationship("Template", back_populates="cards")
    theme = relationship("Theme", lazy="joined")
    category = relationship("Category", lazy="joined")
    rsvps = relationship("Rsvp", back_populates="card", lazy="selectin", cascade="all, delete-orphan")
