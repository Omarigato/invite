from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import create_access_token
from app.core.deps import get_current_user
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, TokenResponse

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])

# In-memory OTP store (production: use Redis)
_otp_store: dict[str, str] = {}


@router.post("/request-otp")
async def request_otp(data: UserCreate):
    """Send OTP to phone (simplified: always use 123456 in dev)"""
    _otp_store[data.phone] = "123456"
    return {"message": "OTP sent", "dev_code": "123456"}


@router.post("/verify-otp")
async def verify_otp(phone: str, code: str, db: AsyncSession = Depends(get_db)):
    """Verify OTP and return JWT token"""
    stored = _otp_store.get(phone)
    if stored != code:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid OTP")

    # Find or create user
    result = await db.execute(select(User).where(User.phone == phone))
    user = result.scalar_one_or_none()
    if not user:
        user = User(phone=phone, name=f"User {phone[-4:]}")
        db.add(user)
        await db.commit()
        await db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(
        access_token=token,
        user=UserResponse.model_validate(user),
    )


@router.get("/me", response_model=UserResponse)
async def get_me(user: User = Depends(get_current_user)):
    return UserResponse.model_validate(user)
