# Shaqyrtu — Сервис электронных приглашений

Полнофункциональный стек для создания онлайн-приглашений на казахские тои.

## Архитектура

```
┌─────────────────────────────────────┐
│         Frontend (Next.js 15)       │
│  React 19 · TypeScript · Tailwind  │
├─────────────────────────────────────┤
│         Backend (FastAPI)           │
│  Python · SQLAlchemy · JWT Auth    │
├─────────────────────────────────────┤
│         Database (SQLite/PG)        │
└─────────────────────────────────────┘
```

## Быстрый старт

### Windows
```bat
start.bat
```

### Linux/Mac
```bash
# Backend
cd apps/api
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000

# Frontend (отдельный терминал)
cd apps\web
npm install
npm run dev
```

## URL

| Сервис | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/api/docs |

## API Endpoints

### Public
- `GET /api/v1/categories` — список категорий
- `GET /api/v1/themes` — список тем
- `GET /api/v1/templates` — список шаблонов
- `GET /api/v1/i/{slug}` — публичное приглашение
- `POST /api/v1/i/{slug}/rsvp` — отправить RSVP
- `GET /api/v1/blog` — список статей
- `POST /api/v1/tools/text-preview` — генератор текста

### Auth
- `POST /api/v1/auth/request-otp` — запросить OTP
- `POST /api/v1/auth/verify-otp` — верифицировать OTP

### Authenticated
- `GET /api/v1/cards` — мои карточки
- `POST /api/v1/cards` — создать карточку
- `PUT /api/v1/cards/{id}` — обновить
- `POST /api/v1/cards/{id}/publish` — опубликовать
- `DELETE /api/v1/cards/{id}` — удалить
- `POST /api/v1/cards/{id}/photos` — загрузить фото

## Стек

### Backend
- **FastAPI** — async Python API
- **SQLAlchemy 2.0** — async ORM
- **SQLite/PostgreSQL** — база данных
- **JWT** — аутентификация

### Frontend
- **Next.js 15** — React SSR/SSG
- **React 19** — UI library
- **TypeScript** — type safety
- **Tailwind CSS v4** — стили
- **shadcn/ui** — компоненты
- **Zod** — валидация
- **React Hook Form** — формы

## Лицензия

Proprietary — Shaqyrtu / abmco.kz

sk-zy-51750613b120cc4fc6eb89091eb58f28c8864a99051fed9e