"""Seed database with initial data"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.category import Category
from app.models.theme import Theme
from app.models.template import Template
from app.models.blog_post import BlogPost, PostLocale


async def seed_database(db: AsyncSession):
    """Seed categories, themes, templates, and blog posts"""
    # Check if already seeded
    result = await db.execute(select(Category).limit(1))
    if result.scalar_one_or_none():
        return

    # Categories
    categories_data = [
        {"slug": "uyilenu-toy", "name_kk": "Үйлену той", "name_ru": "Свадьба", "name_en": "Wedding",
         "cover_url": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800", "sort_order": 1},
        {"slug": "qyz-uzatu", "name_kk": "Қыз ұзату", "name_ru": "Проводы невесты", "name_en": "Bride's Farewell",
         "cover_url": "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800", "sort_order": 2},
        {"slug": "besik-toi", "name_kk": "Бесік той", "name_ru": "Праздник колыбели", "name_en": "Cradle Celebration",
         "cover_url": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800", "sort_order": 3},
        {"slug": "tusau-keser", "name_kk": "Тұсаукесер", "name_ru": "Первые шаги", "name_en": "First Steps",
         "cover_url": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800", "sort_order": 4},
        {"slug": "sundet-toy", "name_kk": "Сүндет той", "name_ru": "Обряд обрезания", "name_en": "Circumcision",
         "cover_url": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800", "sort_order": 5},
        {"slug": "merey-toi", "name_kk": "Мерей той", "name_ru": "Юбилей", "name_en": "Anniversary",
         "cover_url": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800", "sort_order": 6},
        {"slug": "betashar", "name_kk": "Беташар", "name_ru": "Беташар", "name_en": "Betashar",
         "cover_url": "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800", "sort_order": 7},
        {"slug": "kudalyk", "name_kk": "Құдалық", "name_ru": "Сватовство", "name_en": "Matchmaking",
         "cover_url": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800", "sort_order": 8},
        {"slug": "tugan-kun", "name_kk": "Туған күн", "name_ru": "День рождения", "name_en": "Birthday",
         "cover_url": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800", "sort_order": 9},
    ]

    categories = []
    for data in categories_data:
        cat = Category(**data)
        db.add(cat)
        categories.append(cat)
    await db.flush()

    # Themes
    themes_data = [
        {"slug": "floral", "name": "Floral", "description": "WebGL flowers that grow on your GPU",
         "is_premium": False, "thumbnail_url": "/images/design-floral-thumb.jpg"},
        {"slug": "daylight", "name": "Daylight", "description": "Sky opens, sun rises, names light up",
         "is_premium": False, "thumbnail_url": "/images/design-daylight-thumb.jpg"},
        {"slug": "altyn", "name": "Altyn (Premium)", "description": "Gold ornament on black marble",
         "is_premium": True, "thumbnail_url": "/images/design-altyn-thumb.jpg"},
        {"slug": "kazakh", "name": "Kazakh Ornament", "description": "Traditional ornament with mathematical precision",
         "is_premium": False, "thumbnail_url": "/images/design-kazakh-thumb.jpg"},
    ]

    themes = []
    for data in themes_data:
        theme = Theme(**data)
        db.add(theme)
        themes.append(theme)
    await db.flush()

    # Templates (5 per category = ~45 templates)
    for cat in categories:
        for i, theme in enumerate(themes):
            template = Template(
                category_id=cat.id,
                theme_id=theme.id,
                name=f"{cat.name_ru} — {theme.name} #{i+1}",
                is_premium=theme.is_premium,
                sort_order=i + 1,
                fields_schema=[
                    {"key": "event_name", "label": "Название события", "type": "text"},
                    {"key": "description", "label": "Описание", "type": "textarea"},
                    {"key": "date", "label": "Дата", "type": "date"},
                    {"key": "time", "label": "Время", "type": "time"},
                    {"key": "venue", "label": "Место проведения", "type": "text"},
                    {"key": "hosts", "label": "Хозяева", "type": "text"},
                ],
            )
            db.add(template)

    # Blog posts
    blog_data = [
        {
            "slug": "elektronnye-priglasheniya-kazahstan",
            "title": "Электронные приглашения в Казахстане — полное руководство 2026",
            "body": """<h2>Как создать электронное пригласительное</h2>
<p>Цифровые приглашения становятся всё популярнее в Казахстане. Они удобнее бумажных: можно отправить ссылку через WhatsApp, добавить фото, музыку и карту.</p>
<h3>Преимущества</h3>
<ul><li>Создание за 5 минут</li><li>Отправка одной ссылкой</li><li>RSVP в реальном времени</li><li>Экономия на типографии</li></ul>""",
            "locale": PostLocale.ru,
        },
        {
            "slug": "webgl-zhivye-tsvety",
            "title": "WebGL-цветы — как сделана анимация живых цветов",
            "body": """<h2>Технология WebGL в Shaqyrtu</h2>
<p>Цветы в дизайне Floral — не картинки. Они отрисовываются процедурно и растут в реальном времени на GPU вашего устройства.</p>
<p>Используется Three.js и GLSL-шейдеры для создания эффекта живых цветов.</p>""",
            "locale": PostLocale.ru,
        },
        {
            "slug": "promokod-skidka",
            "title": "Скидка по промокоду — пригласи друга, выиграете оба",
            "body": """<h2>Система промокодов</h2>
<p>Активируй приглашение дешевле. Дай другу промокод, он получит скидку 30%, а ты — вознаграждение.</p>""",
            "locale": PostLocale.ru,
        },
        {
            "slug": "kazakskie-toi-vidy-i-traditsii",
            "title": "Казахские тои — виды, традиции и как приглашать гостей",
            "body": """<h2>Все виды казахских тоев</h2>
<p>Үйлену той, Қыз ұзату, Бесік той, Сүндет той, Мерей той — каждый тои имеет свои традиции.</p>""",
            "locale": PostLocale.ru,
        },
    ]

    for data in blog_data:
        post = BlogPost(**data)
        db.add(post)

    await db.commit()
    print("Database seeded successfully!")
