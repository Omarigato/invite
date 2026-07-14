from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/tools", tags=["tools"])


class TextPreviewRequest(BaseModel):
    event_type: str = "wedding"
    language: str = "ru"
    names: str = ""
    date: str = ""
    time: str = ""
    address: str = ""

EVENT_TEMPLATES = {
    "wedding": {
        "ru": """Дорогие друзья и родные!

Мы рады пригласить вас на свадьбу {names}.

Дата: {date}, {time}
Адрес: {address}

Ждём вас с нетерпением!""",
        "kk": """Құрметті достарым мен туыстарым!

Біз {names} үйлену тойына шақыруға қуаныштымыз.

Күні: {date}, {time}
Мекенжайы: {address}

Сіздерді күтеміз!""",
    },
    "kyz_uzatu": {
        "ru": """Дорогие родственники и друзья!

Приглашаем вас на қыз ұзату — проводы невесты {names}.

Дата: {date}, {time}
Адрес: {address}

Будем рады видеть вас!""",
        "kk": """Құрметті туыстарым мен достарым!

Біз {names} қыз ұзату тойына шақырамыз.

Күні: {date}, {time}
Мекенжайы: {address}

Сіздерді қарсы аламыз!""",
    },
    "besik_toi": {
        "ru": """Дорогие друзья!

Приглашаем вас на бесік той — праздник колыбели {names}.

Дата: {date}, {time}
Адрес: {address}

Ждём вас!""",
        "kk": """Құрметті достарым!

Біз {names} бесік тойына шақырамыз.

Күні: {date}, {time}
Мекенжайы: {address}

Күтеміз!""",
    },
}


@router.post("/text-preview")
async def generate_text(data: TextPreviewRequest):
    templates = EVENT_TEMPLATES.get(data.event_type, EVENT_TEMPLATES["wedding"])
    template = templates.get(data.language, templates["ru"])

    text = template.format(
        names=data.names or "Имя",
        date=data.date or "дата",
        time=data.time or "18:00",
        address=data.address or "адрес",
    )

    return {"text": text}
