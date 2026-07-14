from sqlalchemy import String, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class Theme(Base, TimestampMixin):
    __tablename__ = "themes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    slug: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str | None] = mapped_column(String(500))
    is_premium: Mapped[bool] = mapped_column(Boolean, default=False)
    css_variables: Mapped[dict | None] = mapped_column(JSON)
    thumbnail_url: Mapped[str | None] = mapped_column(String(500))

    templates = relationship("Template", back_populates="theme", lazy="selectin")
