from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.database import init_db, async_session
from app.seed import seed_database
from app.routers import auth, categories, themes, templates, cards, rsvp, public, blog, tools


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    async with async_session() as db:
        await seed_database(db)
    yield
    # Shutdown


app = FastAPI(
    title=settings.APP_NAME,
    lifespan=lifespan,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="uploads")

# Register routers
app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(themes.router)
app.include_router(templates.router)
app.include_router(cards.router)
app.include_router(rsvp.router)
app.include_router(public.router)
app.include_router(blog.router)
app.include_router(tools.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME}
