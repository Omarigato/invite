from pydantic import BaseModel


class UserCreate(BaseModel):
    phone: str
    name: str | None = None


class UserResponse(BaseModel):
    id: int
    phone: str
    name: str | None
    username: str | None
    role: str
    locale: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
