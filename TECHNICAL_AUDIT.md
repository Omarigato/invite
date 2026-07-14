# Shaqyrtu.kz — Complete Technical Audit & Implementation Plan

> **Audit scope**: All publicly accessible pages, interactive elements, assets, API patterns, and inferred architecture.
> **Date**: July 2026
> **Target stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, ASP.NET Core 9 Web API

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Site Map & Page Inventory](#2-site-map--page-inventory)
3. [Technology Stack (Observed)](#3-technology-stack-observed)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Design System & UI Components](#5-design-system--ui-components)
6. [Page-by-Page Technical Breakdown](#6-page-by-page-technical-breakdown)
7. [Backend Architecture (Inferred)](#7-backend-architecture-inferred)
8. [Database Schema (Inferred)](#8-database-schema-inferred)
9. [API Contracts (Inferred)](#9-api-contracts-inferred)
10. [Analytics & Third-Party Integrations](#10-analytics--third-party-integrations)
11. [SEO & Metadata Strategy](#11-seo--metadata-strategy)
12. [Performance Profile](#12-performance-profile)
13. [User Flows](#13-user-flows)
14. [Business Logic](#14-business-logic)
15. [Implementation Plan: Next.js + ASP.NET Core](#15-implementation-plan-nextjs--aspnet-core)

---

## 1. Product Overview

**Shaqyrtu** (Қазақша "шақыру" — "to invite") is a SaaS platform for creating digital invitations for Kazakh celebrations (тои). Users select a template, customise text/photos/music, and share a personal link. Guests RSVP through the link.

### Value Propositions
- Create in 3-5 minutes from phone
- Beautiful Kazakh-themed designs (ornament, gold, floral, daylight)
- Share via WhatsApp/Telegram/SMS
- RSVP tracking in real-time
- Free personal link (`/i/<slug>`)
- From 1000 KZT with sponsor; premium Altyn theme
- Partner program: 30% revenue share per promo code

### Monetization Tiers
| Tier | Price | Features |
|------|-------|----------|
| Free | 0 KZT | Personal link (`/i/<username>`), basic templates |
| Standard | 1000-20000 KZT | Premium templates, custom slug, no watermark |
| Altyn Premium | Higher | Gold-themed 3D heart, dark accent, balloon burst |
| Slug Rental | 2000-7500 KZT | Vanity URL for 2-12 months |
| Partner | 30% share | Promo code activation revenue |

---

## 2. Site Map & Page Inventory

### Public Routes (Verified)

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSR+CSR | Landing page — hero, design showcase, category grid, partner CTA |
| `/blog` | SSR | Blog listing — 20+ posts in KZ/RU/EN |
| `/blog/<slug>` | SSR | Blog post detail — articles about traditions, guides |
| `/theme/<name>` | SSR | Theme showcase — floral, daylight, altyn, kazakh |
| `/new_card_config?template=<id>&theme=<theme>` | CSR | Card creation wizard (auth-gated) |
| `/i/<slug>` | SSR | Public invitation view (guest-facing) |
| `/i/demo-floral` | SSR | Demo invitation — Floral theme |
| `/i/demo-daylight` | SSR | Demo invitation — Daylight theme |
| `/i/demo-altyn` | SSR | Demo invitation — Altyn theme |
| `/i/demo-kazakh` | SSR | Demo invitation — Kazakh ornament theme |
| `/ru/templates` | SSR | Template listing — 12 event categories |
| `/ru/templates/<slug>` | SSR | Category templates — wedding, kyz-uzatu, etc. |
| `/kk/templates` | SSR | KZ version of template listing |
| `/shakyru-zhasau` | SSR | KZ landing (alternate) |
| `/elektronnye-priglasheniya` | SSR | SEO landing for "electronic invitations" |
| `/tools/tekst-priglasheniya` | CSR | Text generator tool — form-based utility |
| `/terms` | SSR | Personal Data Processing Agreement |
| `/site.webmanifest` | Static | PWA manifest |
| `/_nuxt/builds/meta/<uuid>.json` | Static | Nuxt build manifest |

### Unverified Routes (Likely)
| Route | Purpose |
|-------|---------|
| `/login` or `/auth` | Authentication (phone OTP) |
| `/dashboard` | User card management |
| `/partner` | Partner dashboard |
| `/partner/promo` | Promo code management |

---

## 3. Technology Stack (Observed)

### Frontend
| Layer | Technology | Evidence |
|-------|-----------|----------|
| Framework | **Nuxt 3** (Vue 3) | `__nuxt` div, `/_nuxt/` paths, `router-link-active`, `data-v-*` scoped styles |
| UI Library | **Nuxt UI v3** (Reka UI) | `@layer theme` with `--ui-color-*`, `data-slot` attributes, Tabs component |
| CSS | **Tailwind CSS v4** | oklch color system, `@layer theme`, utility classes, `@layer components` |
| Icons | **Iconify** (Lucide + Heroicons + MDI) | `.i-lucide:*`, `.i-heroicons:*`, `.i-mdi:*` CSS icon classes |
| Fonts | **Google Fonts** | Comfortaa, Cormorant Garamond, Noto Serif, Jost, Great Vibes |
| Color Mode | **@nuxtjs/color-mode** | `class="light"`, `nuxt-color-mode` localStorage, system detection |
| Drawer | **Vaul** | `data-vaul-drawer`, `data-vaul-snap-points` |
| Tabs | **Reka UI** | `data-reka-collection-item`, `reka-tabs-*` IDs |
| WebGL | **Three.js** | Floral theme: "one three.js canvas, one WebGL context" |
| Routing | **Nuxt file-based router** | `router-link-active`, locale-prefixed routes |

### Backend (Inferred)
| Layer | Technology | Evidence |
|-------|-----------|----------|
| API | **Separate service** | `api.shaqyrtu.kz` subdomain |
| Storage | **Laravel-style** | `/storage/categories/covers/<hash>.jpg` |
| Database | **MySQL/PostgreSQL** | Standard for Laravel ecosystem |
| Auth | **Phone OTP** | "phone number constitutes personal data", KZ market pattern |
| Payments | **Kaspi Pay / Freedom Pay** | KZ market, price in KZT |

### Static Assets (28 files)
| Type | Files | Purpose |
|------|-------|---------|
| CSS | 12 files | `entry.CDGRqsZO.css` (363KB), `index.isgKWlNQ.css` (42KB), theme-specific |
| JS | 7 files | PostHog analytics: recorder, surveys, dead-clicks, web-vitals, tracing, exceptions |
| Images | 9 files | Category covers (.jpg), logo (.png) |

---

## 4. Frontend Architecture

### 4.1 Component Hierarchy (Inferred from scoped styles)

```
App.vue
├── LayoutDefault.vue
│   ├── Header.vue
│   │   ├── Logo.vue
│   │   ├── LanguageSwitcher.vue (Reka UI Tabs)
│   │   └── ThemeToggle.vue (Lucide sun/moon)
│   └── Footer.vue
│
├── pages/
│   ├── index.vue (Landing)
│   │   ├── LandingAmbient.vue (data-v-2b68f3f5)
│   │   ├── HeroSection.vue
│   │   ├── DesignShowcase.vue (Scrollable, video preview)
│   │   ├── CategoryGrid.vue
│   │   └── PartnerCTA.vue
│   │
│   ├── new_card_config.vue (Card Editor)
│   │   ├── StepTitle.vue (transition animations)
│   │   ├── TextField.vue
│   │   ├── PhotoUpload.vue
│   │   ├── MusicPicker.vue
│   │   └── CardPreview.vue
│   │
│   ├── i/[slug].vue (Invitation View)
│   │   ├── InvitationLayout.vue
│   │   ├── EventHero.vue
│   │   ├── CountdownTimer.vue
│   │   ├── VenueMap.vue (2GIS embed)
│   │   ├── HostsSection.vue
│   │   ├── ScheduleTimeline.vue
│   │   ├── RsvpForm.vue
│   │   └── PromoBanner.vue
│   │
│   ├── theme/[slug].vue
│   │   ├── ThemeShowcase.vue
│   │   ├── ThemeDemo.vue
│   │   └── ThemeDetails.vue
│   │
│   └── blog/
│       ├── index.vue (Blog List)
│       └── [slug].vue (Blog Post)
│
├── components/
│   ├── GeneratedCover.vue (data-v-c983a461)
│   ├── Scrollable.vue (data-v-*)
│   ├── GalleryPreviewProvider.vue (data-v-*)
│   ├── IosDrawer.vue (data-v-7c7ca093)
│   ├── SvgDecor.vue (data-v-*)
│   ├── EnvelopeOverlay.vue (data-v-5db66b2d)
│   ├── FloralBloom.vue (data-v-7e9f71fc)
│   ├── DaylightNight.vue (data-v-8d09cba8)
│   └── AltynOrnament.vue (data-v-0bdf5615)
│
└── composables/
    ├── useIntroAutoStart()
    └── useCardEditor()
```

### 4.2 Key Component: GeneratedCover

CSS-only procedural cover generator with these layers:
- **Surface**: Dual radial gradients (white highlight + warm color mix)
- **Grain**: SVG `feTurbulence` noise filter at 4% opacity
- **Orbs**: 2 blurred circles with `color-mix()` blending
- **Frame**: Border with glass inset effect
- **Shine**: Animated gradient sweep (6.8s cycle)
- **Glow**: Radial white gradient behind center
- Two variants: `--hero` (large, animated) and `--card` (compact, static)

### 4.3 Key Component: EnvelopeOverlay

Full-screen interactive envelope animation:
- CSS perspective (1500px) for 3D depth
- Flap, liner, pocket with clip-path polygons
- Grab-to-open interaction (`cursor: grab/grabbing`)
- `will-change: transform, opacity` for GPU acceleration
- Texture overlay with repeating gradients

### 4.4 Key Component: FloralBloom

WebGL flower animation (Three.js):
- Procedural petal generation with CSS clip-paths
- Scroll-following ribbon animation
- RSVP bouquet gathering effect
- Seamless loop cycle
- `--fb-bg`, `--fb-accent`, `--fb-ink` CSS custom properties

### 4.5 Key Component: DaylightNight

Scroll-driven intro animation:
- Cloud gate (85dvh cloud bank)
- Letter-by-letter name reveal
- Sun glow animation (2.6s cycle)
- Warm palette transition
- `prefers-reduced-motion` support

### 4.6 Key Component: AltynOrnament

Premium gold ornament:
- SVG ornament with shimmer animation (4.5s cycle)
- `brightness()` filter animation
- Corner and symmetric positioning variants
- Dark background with gold accent

---

## 5. Design System & UI Components

### 5.1 Color Palette (oklch)

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `primary` | Indigo 500 | Indigo 400 | Main brand actions |
| `secondary` | Blue 500 | Blue 400 | Secondary elements |
| `success` | Green 500 | Green 400 | Confirmations |
| `warning` | Yellow 500 | Yellow 400 | Caution |
| `error` | Red 500 | Red 400 | Errors |
| `neutral` | Gray 50-950 | Gray 50-950 | Text, borders |

### 5.2 Typography

| Font | Weight | Usage |
|------|--------|-------|
| **Comfortaa** | 300-700 | Display/headings (rounded geometric) |
| **Cormorant Garamond** | 400-600 | Daylight theme names (elegant serif) |
| **Noto Serif** | 400-600 | Body text in serif contexts |
| **Jost** | 300-600 | Body text (geometric sans) |
| **Great Vibes** | 400 | Decorative/cursive accents |

### 5.3 Design Tokens (CSS Custom Properties)

```css
/* Theme colors */
--ui-color-primary-50 through --ui-color-primary-950
--ui-color-secondary-50 through --ui-color-secondary-950
--ui-color-success-50 through --ui-color-success-950
--ui-color-warning-50 through --ui-color-warning-950
--ui-color-error-50 through --ui-color-error-950
--ui-color-neutral-50 through --ui-color-neutral-950

/* Semantic aliases */
--ui-primary, --ui-secondary, --ui-success, --ui-warning, --ui-error

/* GeneratedCover */
--cover-bg, --cover-accent, --cover-border, --cover-soft, --cover-warm
--cover-inset, --cover-frame-opacity, --cover-orb-one-size, --cover-orb-two-size
--cover-emoji-size, --cover-glow-size

/* FloralBloom */
--fb-bg, --fb-accent, --fb-ink

/* Envelope */
--env-surface, --env-accent, --env-ink

/* Daylight */
--font-daylight-display, --font-daylight-body

/* Altyn */
--font-altyn-body, --altyn-bg, --altyn-ink, --altyn-accent
```

### 5.4 shadcn/ui Component Mapping

| Original Component | shadcn/ui Equivalent | Customization |
|-------------------|---------------------|---------------|
| Language Switcher (Reka Tabs) | `Tabs` + `TabsList` + `TabsTrigger` | Pill-style, rounded-full |
| Theme Toggle | `Button` (ghost) | Sun/moon icons |
| Card Grid | Custom `Grid` | `grid-cols-2 gap-3` |
| Category Card | Custom `Card` | Aspect-ratio 4/5, overlay gradient |
| Design Showcase | Custom `Carousel` | Snap-scroll, video preview |
| Partner CTA | Custom `Card` | Border, icon, badge |
| RSVP Form | `Input` + `Select` + `Button` | Name, phone, guest count |
| Blog Post | Custom `Article` | Markdown rendered, tags |
| Drawer | `Drawer` (Vaul-based) | iOS-style bottom sheet |
| Step Title | Custom animation | Slide transition (180ms) |
| Badge | `Badge` | Pill-style, backdrop-blur |

---

## 6. Page-by-Page Technical Breakdown

### 6.1 Landing Page (`/`)

**Layout**: Two-column (58%/42% on desktop, stacked on mobile)

**Sections**:
1. **Header** — Sticky with backdrop-blur-md, logo, lang switcher, dark mode toggle
2. **Hero** — H1, subtitle, 5 bullet points, pricing badge, personal link badge
3. **Design Showcase** — 4 theme cards with video previews, dot pagination
4. **Partner CTA** — Desktop-only banner
5. **Category Grid** — 9 event categories in 2-column grid
6. **Partner CTA** — Mobile version
7. **Footer** — Links, developer credit, Instagram

**Interactive Elements**:
- Language switcher (KZ/RU/EN tabs)
- Dark mode toggle (sun/moon)
- Design showcase horizontal scroll (snap-x)
- Video previews on hover (opacity transition)
- Category cards with hover scale + shadow
- Partner CTA button

**Animations**:
- Ambient background blobs (3 blobs, 22-28s cycles)
- Card hover: `translate-y-1`, shadow expansion
- Video fade-in: 500ms opacity
- Generated cover shine: 6.8s shimmer

### 6.2 Invitation View (`/i/<slug>`)

**Layout**: Single-column, full-screen mobile-optimized

**Sections**:
1. **Event Hero** — Cover image, event name, date, description
2. **Countdown Timer** — Days/Hours/Minutes/Seconds (live updating)
3. **Venue** — Address + 2GIS map link
4. **Hosts** — Two host names side-by-side
5. **Schedule** — Timeline with 7 event steps
6. **RSVP Form** — Name, phone, guest count, submit button
7. **Promo Banner** — "Create with discount -30%"
8. **Footer** — "Made with shaqyrtu.kz"

**Interactive Elements**:
- Countdown timer (JavaScript setInterval)
- RSVP form submission
- Promo code activation link
- 2GIS map external link

**Data Model** (from demo):
```json
{
  "cover_image": "https://api.shaqyrtu.kz/storage/images/2026/07/<uuid>.webp",
  "event_name": "Томирис",
  "date": "2027-05-28T18:00:00",
  "venue": "Астана, ресторан «Той Думан», Мәңгілік Ел 29",
  "hosts": ["Серік", "Гүлнар"],
  "schedule": [
    { "time": "18:00", "title": "Қонақтарды қарсы алу" },
    { "time": "18:30", "title": "Тойбастар" },
    ...
  ],
  "rsvp_fields": ["name", "phone", "guest_count"],
  "promo_code": "SHAQYRTU"
}
```

### 6.3 Blog (`/blog`)

**Layout**: Grid of post cards with language tags

**Features**:
- 20+ posts in KZ, RU, EN
- Language tag per post (Қазақша / Русский / English)
- Date display
- Title + excerpt
- Link to full post

**Blog Post** (`/blog/<slug>`):
- Rendered markdown/HTML
- Anchor links for sections
- "Create invitation" CTA at bottom
- Related posts

### 6.4 Theme Showcase (`/theme/<name>`)

**Layout**: Full-page theme detail with demo link

**Content per theme**:
1. **Title** — Theme name
2. **Tagline** — "The flowers on screen are not a picture..."
3. **CTA** — "Create with this design" + "View demo"
4. **Description** — Technical explanation of the theme
5. **Key Moments** — 3 numbered features
6. **Other Designs** — Links to 3 other themes
7. **Bottom CTA** — "Create your invitation"

**Themes**:
| Theme | Key Feature | Tech |
|-------|------------|------|
| Floral | Living WebGL flowers | Three.js, GLSL shaders, procedural animation |
| Daylight | Cloud gate + name reveal | Scroll-driven, CSS animations |
| Altyn | 3D gold heart + balloon burst | Premium, dark accent, 3 palettes |
| Kazakh ornament | Vector SVG pattern | Mathematical symmetry, rotation, mirror |

### 6.5 Card Editor (`/new_card_config`)

**Layout**: Multi-step wizard (inferred from CSS transitions)

**Steps** (inferred):
1. Choose template variant
2. Fill text fields (event name, date, time, venue, hosts)
3. Upload photos
4. Choose background music
5. Preview card
6. Publish → generate shareable link

**Animations**: Step title transitions (180ms slide left/right)

### 6.6 Text Generator (`/tools/tekst-priglasheniya`)

**Layout**: Form + preview

**Form Fields**:
- Event type (Свадьба / Үйлену той)
- Language (Русский / Қазақша)
- Names / honorees
- Date and time
- Address

**Output**: Pre-formatted invitation text ready for WhatsApp

### 6.7 Templates Page (`/ru/templates`)

**Layout**: Grid of 12 event categories

**Categories**:
1. Свадьба (Wedding)
2. Қыз ұзату (Bride's farewell)
3. Бесік той (Cradle celebration)
4. Тұсаукесер (First steps)
5. Сүндет той (Circumcision)
6. Мерей той (Anniversary)
7. Беташар (Face-opening)
8. Құдалық (Matchmaking)
9. Корпоратив (Corporate)
10. Асқа шақыру (Feast invitation)
11. Туған күн (Birthday)
12. Неке қию (Wedding registration)

---

## 7. Backend Architecture (Inferred)

### 7.1 API Server

| Aspect | Detail |
|--------|--------|
| Base URL | `https://api.shaqyrtu.kz` |
| Storage Pattern | Laravel-style: `/storage/<type>/<hash>.<ext>` |
| Likely Framework | **Laravel** (PHP) |
| Auth | Phone OTP (KZ market standard) |
| CORS | Configured for `shaqyrtu.kz` |

### 7.2 Storage Paths

```
api.shaqyrtu.kz/storage/
├── categories/covers/    # Category thumbnail images
│   ├── <hash>.jpg
│   └── <hash>.webp
├── images/<YYYY>/<MM>/   # User-uploaded images
│   └── <uuid>.webp
├── templates/            # Template preview images
└── music/               # Background music files
```

### 7.3 Inferred Services

| Service | Purpose |
|---------|---------|
| AuthService | Phone OTP login, session management |
| CardService | CRUD for invitation cards |
| TemplateService | Template listing, filtering |
| CategoryService | Event category management |
| ThemeService | Design theme configuration |
| ImageService | Upload, resize, WebP conversion |
| ShareService | Slug generation, short URLs |
| RsvpService | Guest response collection |
| PaymentService | Kaspi Pay / Freedom Pay integration |
| PartnerService | Promo code generation, tracking |
| BlogService | Article CRUD, i18n |
| SlugRentalService | Vanity URL rental management |
| TextGeneratorService | Invitation text templates |
| SmsService | OTP delivery (KazTransCom / Twilio) |
| AnalyticsService | PostHog event forwarding |

---

## 8. Database Schema (Inferred)

### Core Tables

```sql
-- Users (phone-based auth)
CREATE TABLE users (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    phone           VARCHAR(20) UNIQUE NOT NULL,
    email           VARCHAR(255) NULL,
    name            VARCHAR(255) NULL,
    username        VARCHAR(100) UNIQUE NULL,  -- for /i/<username>
    role            ENUM('user','partner','admin') DEFAULT 'user',
    locale          ENUM('kk','ru','en') DEFAULT 'ru',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Event Categories
CREATE TABLE categories (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    slug            VARCHAR(100) UNIQUE NOT NULL,  -- 'uyilenu-toy'
    name_kk         VARCHAR(255) NOT NULL,
    name_ru         VARCHAR(255) NOT NULL,
    name_en         VARCHAR(255) NOT NULL,
    cover_url       TEXT NOT NULL,
    template_count  INT DEFAULT 0,
    sort_order      INT DEFAULT 0
);

-- Design Themes
CREATE TABLE themes (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    slug            VARCHAR(50) UNIQUE NOT NULL,  -- 'floral','daylight','altyn','kazakh'
    name            VARCHAR(100) NOT NULL,
    is_premium      BOOLEAN DEFAULT FALSE,
    css_variables   JSON NOT NULL,  -- theme color tokens
    config          JSON NOT NULL   -- WebGL/animation settings
);

-- Templates
CREATE TABLE templates (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    category_id     INT NOT NULL REFERENCES categories(id),
    theme_id        INT NOT NULL REFERENCES themes(id),
    name            VARCHAR(255) NOT NULL,
    preview_url     TEXT NOT NULL,
    fields_schema   JSON NOT NULL,  -- defines editable text fields
    is_premium      BOOLEAN DEFAULT FALSE,
    sort_order      INT DEFAULT 0,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invitation Cards
CREATE TABLE cards (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id         BIGINT NOT NULL REFERENCES users(id),
    template_id     INT NOT NULL REFERENCES templates(id),
    theme_id        INT NOT NULL REFERENCES themes(id),
    category_id     INT NOT NULL REFERENCES categories(id),
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(100) UNIQUE NOT NULL,  -- random or vanity
    custom_slug     VARCHAR(100) NULL,             -- rented vanity URL
    status          ENUM('draft','published','archived') DEFAULT 'draft',
    fields          JSON NOT NULL,   -- { event_name, date, time, venue, hosts, description }
    photos          JSON DEFAULT '[]', -- array of image URLs
    music_url       TEXT NULL,
    schedule        JSON DEFAULT '[]', -- array of { time, title }
    promo_code      VARCHAR(50) NULL,
    published_at    TIMESTAMP NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_cards_user (user_id),
    INDEX idx_cards_slug (slug),
    INDEX idx_cards_status (status)
);

-- RSVPs
CREATE TABLE rsvps (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    card_id         BIGINT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    guest_name      VARCHAR(255) NOT NULL,
    guest_phone     VARCHAR(20) NULL,
    guest_count     INT DEFAULT 1,
    attending       BOOLEAN NOT NULL,
    message         TEXT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rsvps_card (card_id)
);

-- Slug Rentals
CREATE TABLE slug_rentals (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    slug            VARCHAR(100) UNIQUE NOT NULL,
    user_id         BIGINT NOT NULL REFERENCES users(id),
    card_id         BIGINT NULL REFERENCES cards(id),
    price_kzt       INT NOT NULL,
    duration_months INT NOT NULL,  -- 2, 3, 6, 12
    expires_at      TIMESTAMP NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_slug_rental_slug (slug)
);

-- Promo Codes
CREATE TABLE promo_codes (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    code            VARCHAR(50) UNIQUE NOT NULL,
    partner_id      BIGINT NULL REFERENCES users(id),
    discount_pct    INT DEFAULT 30,
    usage_count     INT DEFAULT 0,
    max_uses        INT NULL,
    expires_at      TIMESTAMP NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts
CREATE TABLE blog_posts (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    title           VARCHAR(255) NOT NULL,
    body            LONGTEXT NOT NULL,  -- Markdown or HTML
    cover_url       TEXT NULL,
    locale          ENUM('kk','ru','en') NOT NULL,
    published_at    TIMESTAMP NULL,
    seo_title       VARCHAR(255) NULL,
    seo_description TEXT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_blog_slug (slug),
    INDEX idx_blog_locale (locale)
);

-- Payments
CREATE TABLE payments (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id         BIGINT NOT NULL REFERENCES users(id),
    card_id         BIGINT NULL REFERENCES cards(id),
    slug_rental_id  BIGINT NULL REFERENCES slug_rentals(id),
    amount_kzt      INT NOT NULL,
    provider        VARCHAR(50) NOT NULL,  -- 'kaspi','freedom','stripe'
    provider_ref    VARCHAR(255) NULL,
    status          ENUM('pending','completed','failed','refunded') DEFAULT 'pending',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 9. API Contracts (Inferred)

### 9.1 Public API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/categories` | No | List event categories |
| `GET` | `/api/v1/themes` | No | List design themes |
| `GET` | `/api/v1/templates` | No | List templates (filterable) |
| `GET` | `/api/v1/templates/:id` | No | Single template details |
| `GET` | `/api/v1/i/:slug` | No | Public invitation data |
| `POST` | `/api/v1/rsvp` | No | Submit RSVP |
| `GET` | `/api/v1/blog` | No | Blog posts (paginated, filterable) |
| `GET` | `/api/v1/blog/:slug` | No | Blog post detail |
| `POST` | `/api/v1/tools/text-preview` | No | Generate invitation text |

### 9.2 Authenticated API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/auth/request-otp` | No | Send OTP to phone |
| `POST` | `/api/v1/auth/verify-otp` | No | Verify OTP, return token |
| `GET` | `/api/v1/user/me` | Bearer | Current user profile |
| `GET` | `/api/v1/user/cards` | Bearer | User's cards |
| `POST` | `/api/v1/cards` | Bearer | Create new card |
| `PUT` | `/api/v1/cards/:id` | Bearer | Update card |
| `POST` | `/api/v1/cards/:id/publish` | Bearer | Publish card |
| `DELETE` | `/api/v1/cards/:id` | Bearer | Delete card |
| `POST` | `/api/v1/cards/:id/photos` | Bearer | Upload photo |
| `GET` | `/api/v1/cards/:id/rsvps` | Bearer | List RSVPs |
| `POST` | `/api/v1/slug/check/:slug` | Bearer | Check slug availability |
| `POST` | `/api/v1/slug/rent` | Bearer | Rent vanity slug |
| `POST` | `/api/v1/promo/activate` | Bearer | Activate promo code |
| `GET` | `/api/v1/partner/stats` | Bearer | Partner earnings |

### 9.3 Request/Response Schemas

```typescript
// POST /api/v1/auth/request-otp
interface RequestOtpRequest {
  phone: string;  // "+77001234567"
}
interface RequestOtpResponse {
  success: boolean;
  message: string;
}

// POST /api/v1/auth/verify-otp
interface VerifyOtpRequest {
  phone: string;
  code: string;  // "123456"
}
interface VerifyOtpResponse {
  token: string;  // JWT
  user: User;
}

// GET /api/v1/i/:slug
interface InvitationResponse {
  card: {
    id: number;
    title: string;
    slug: string;
    theme: Theme;
    fields: {
      event_name: string;
      description: string;
      date: string;       // ISO 8601
      time: string;       // "18:00"
      venue: string;
      venue_map_url: string;
      hosts: string[];    // ["Серік", "Гүлнар"]
    };
    photos: string[];
    music_url: string | null;
    schedule: { time: string; title: string }[];
    promo_code: string | null;
  };
}

// POST /api/v1/rsvp
interface RsvpRequest {
  card_id: number;
  guest_name: string;
  guest_phone?: string;
  guest_count: number;
  attending: boolean;
  message?: string;
}
interface RsvpResponse {
  success: boolean;
  rsvp_id: number;
}

// POST /api/v1/cards
interface CreateCardRequest {
  template_id: number;
  theme_id: number;
  title: string;
}
interface CreateCardResponse {
  card: Card;
}

// PUT /api/v1/cards/:id
interface UpdateCardRequest {
  title?: string;
  fields?: Record<string, any>;
  schedule?: { time: string; title: string }[];
}
```

---

## 10. Analytics & Third-Party Integrations

### PostHog Configuration

```javascript
// Token: phc_ChVyoQsaTefXDEMCdDmJfHao8bqy9v39xDEds4og7zrs
window._POSTHOG_REMOTE_CONFIG = {
  config: {
    analytics: { endpoint: "/i/v0/e/" },
    autocaptureExceptions: false,
    autocapture_opt_out: false,
    captureDeadClicks: false,
    capturePerformance: { network_timing: true, web_vitals: true },
    conversations: false,
    defaultIdentifiedOnly: true,
    elementsChainAsString: true,
    heatmaps: true,
    logs: { captureConsoleLogs: false },
    productTours: false,
    sessionRecording: {
      recorderVersion: "v2",
      consoleLogRecordingEnabled: true,
      recordCanvas: false,
      endpoint: "/s/"
    },
    surveys: false,
    supportedCompression: ["gzip", "gzip-js"]
  }
};
```

**PostHog JS Bundles** (6 files):
- `posthog-recorder.js` — Session recording
- `surveys.js` — In-app surveys (currently disabled)
- `dead-clicks-autocapture.js` — Dead click detection (currently disabled)
- `web-vitals.js` — LCP, FID, CLS tracking
- `tracing-headers.js` — Distributed tracing
- `exception-autocapture.js` — Error tracking (currently disabled)

### Other Integrations
| Service | Purpose | Evidence |
|---------|---------|----------|
| Google Fonts | Typography | 5 fonts loaded |
| 2GIS | Maps | Venue links to 2GIS |
| Instagram | Social | @shaqyrtu.service |
| Threads | Social | @shaqyrtu.service |
| Telegram Bot | Support | @shaqyrtu_kz_abmco_bot |
| PWA | Installability | site.webmanifest, apple-touch-icon |

---

## 11. SEO & Metadata Strategy

### Meta Tags (Landing)
```html
<title>Shaqyrtu — digital invitations for Kazakh celebrations</title>
<meta name="description" content="Online invites for weddings, qyz uzatu, besik toy. Templates, WhatsApp sharing, RSVP. from 1000 ₸ with a sponsor.">
<meta name="theme-color" content="#4f46e5">
<link rel="canonical" href="https://shaqyrtu.kz/">
```

### Open Graph
```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Shaqyrtu">
<meta property="og:url" content="https://shaqyrtu.kz/">
<meta property="og:title" content="Shaqyrtu — digital invitations for Kazakh celebrations">
<meta property="og:description" content="Online invites for weddings, qyz uzatu, besik toy...">
<meta property="og:image" content="https://shaqyrtu.kz/ogImage.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://shaqyrtu.kz/ogImage.png">
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Shaqyrtu",
      "url": "https://shaqyrtu.kz",
      "logo": "https://shaqyrtu.kz/logo.png",
      "areaServed": { "@type": "Country", "name": "Kazakhstan" },
      "knowsLanguage": ["kk", "ru", "en"],
      "sameAs": [
        "https://www.instagram.com/shaqyrtu.service/",
        "https://www.threads.com/@shaqyrtu.service",
        "https://t.me/shaqyrtu_kz_abmco_bot"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Shaqyrtu",
      "url": "https://shaqyrtu.kz",
      "inLanguage": ["kk-KZ", "ru-RU", "en"]
    },
    {
      "@type": "Service",
      "name": "Цифровые приглашения / Цифрлық шақыру",
      "serviceType": "Digital invitation design",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "1000",
        "highPrice": "20000",
        "priceCurrency": "KZT"
      }
    }
  ]
}
```

### Favicons & PWA
```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

---

## 12. Performance Profile

### Observed Optimizations
| Technique | Implementation |
|-----------|---------------|
| Image formats | WebP with JPG fallback (`<picture>` + `<source>`) |
| Lazy loading | `loading="lazy"` on images, video `preload="auto"` |
| Code splitting | 35+ JS chunks with `rel="modulepreload"` |
| Critical CSS | Inline styles for above-fold content |
| Font loading | Google Fonts with preconnect hints |
| Reduced motion | `prefers-reduced-motion` media queries |
| GPU acceleration | `will-change: transform`, `backface-visibility: hidden` |
| Touch optimization | `touch-action: manipulation` on interactive elements |
| Build hashing | UUID-based asset names for cache busting |

### Potential Issues
1. **35+ JS module preloads** — network contention on initial load
2. **4 video preloads** — `preload="auto"` on design demo videos
3. **Large CSS** — `entry.CDGRqsZO.css` at 363KB (Tailwind v4 output)
4. **5 Google Fonts** — render-blocking, could use font-display: swap

---

## 13. User Flows

### Flow 1: Create Invitation
```
Landing Page
    ↓
Pick Category (grid) or Theme (carousel)
    ↓
/new_card_config?template=<id>&theme=<floral>
    ↓ (auth required)
Step 1: Choose template variant
Step 2: Fill text fields
Step 3: Upload photos
Step 4: Choose music
Step 5: Preview
Step 6: Publish
    ↓
Receive link: shaqyrtu.kz/i/<slug>
    ↓
Share via WhatsApp
```

### Flow 2: Guest RSVP
```
Receive link (WhatsApp)
    ↓
Open shaqyrtu.kz/i/<slug>
    ↓
View invitation (full-screen, mobile-optimized)
    ↓
RSVP form: name, phone, guest count, attending
    ↓
Submit → confirmation
```

### Flow 3: Partner Earnings
```
Learn about program (landing CTA)
    ↓
Register as partner
    ↓
Receive promo code
    ↓
Share code → users activate → 30% revenue share
```

### Flow 4: Slug Rental
```
Create invitation → publish
    ↓
Dashboard → "Красивый адрес"
    ↓
Check availability → select duration (2-12 months)
    ↓
Pay → vanity URL active
```

---

## 14. Business Logic

### Pricing Rules
- Base price: 1000 KZT (with sponsor)
- Without sponsor: higher tier
- Altyn theme: premium pricing
- Slug rental: 2000-7500 KZT (2-12 months)
- Promo discount: 30%

### Slug Rental Business Rules
- Slug is unique resource — only one renter at a time
- Rental period: 2-12 months
- On expiry: slug reverts to random, content preserved
- Popular slugs sell out quickly

### RSVP Rules
- One RSVP per phone number per card
- Guest count capped (configurable)
- Real-time updates to card owner

### Partner Rules
- 30% revenue share per activation
- Promo codes have max usage limits
- Expiry dates optional

---

## 15. Implementation Plan: Next.js + ASP.NET Core

### 15.1 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)             │
│  React 19 · TypeScript · Tailwind v4 · shadcn/ui   │
├─────────────────────────────────────────────────────┤
│                    Backend (ASP.NET Core 9)          │
│  Web API · EF Core · JWT Auth · SignalR             │
├─────────────────────────────────────────────────────┤
│                    Database (PostgreSQL 16)          │
│  Full-text search · JSON support · Extensions       │
├─────────────────────────────────────────────────────┤
│                    Infrastructure                    │
│  Azure / AWS · CDN · Object Storage · CI/CD        │
└─────────────────────────────────────────────────────┘
```

### 15.2 Project Structure

```
shaqyrtu/
├── src/
│   ├── apps/
│   │   └── web/                          # Next.js 15 App Router
│   │       ├── app/
│   │       │   ├── layout.tsx            # Root layout (fonts, theme, analytics)
│   │       │   ├── page.tsx              # Landing page
│   │       │   ├── blog/
│   │       │   │   ├── page.tsx          # Blog listing
│   │       │   │   └── [slug]/page.tsx   # Blog post
│   │       │   ├── theme/
│   │       │   │   └── [slug]/page.tsx   # Theme showcase
│   │       │   ├── templates/
│   │       │   │   ├── page.tsx          # Template listing
│   │       │   │   └── [category]/page.tsx
│   │       │   ├── create/
│   │       │   │   └── page.tsx          # Card creation wizard
│   │       │   ├── i/
│   │       │   │   └── [slug]/page.tsx   # Public invitation
│   │       │   ├── tools/
│   │       │   │   └── text-generator/page.tsx
│   │       │   └── terms/page.tsx
│   │       ├── components/
│   │       │   ├── ui/                   # shadcn/ui components
│   │       │   ├── landing/              # Landing page components
│   │       │   ├── invitation/           # Invitation view components
│   │       │   ├── editor/               # Card editor components
│   │       │   ├── blog/                 # Blog components
│   │       │   └── shared/               # Shared components
│   │       ├── hooks/                    # Custom React hooks
│   │       ├── lib/                      # Utilities, API client
│   │       ├── stores/                   # Zustand stores
│   │       └── styles/                   # Global styles, Tailwind config
│   │
│   └── api/                             # ASP.NET Core 9 Web API
│       ├── Shaqyrtu.Api/
│       │   ├── Controllers/
│       │   ├── Middleware/
│       │   ├── Program.cs
│       │   └── appsettings.json
│       ├── Shaqyrtu.Application/
│       │   ├── DTOs/
│       │   ├── Interfaces/
│       │   ├── Services/
│       │   └── Validators/
│       ├── Shaqyrtu.Domain/
│       │   ├── Entities/
│       │   ├── Enums/
│       │   └── Events/
│       ├── Shaqyrtu.Infrastructure/
│       │   ├── Data/
│       │   ├── Repositories/
│       │   ├── Services/
│       │   └── Migrations/
│       └── Shaqyrtu.Tests/
│           ├── Unit/
│           └── Integration/
│
├── infra/
│   ├── docker-compose.yml
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── nginx.conf
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── turbo.json
├── package.json
└── README.md
```

### 15.3 Technology Decisions

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Meta-framework | Next.js 15 (App Router) | SSR/SSG, React Server Components, image optimization |
| UI components | shadcn/ui | Accessible, customizable, Tailwind-native |
| State management | Zustand + React Server Components | Lightweight, server-first |
| Forms | React Hook Form + Zod | Type-safe validation |
| API client | ky or openapi-fetch | Type-safe HTTP |
| Database | PostgreSQL 16 | JSON support, full-text search, extensions |
| ORM | EF Core 9 | .NET native, migrations, LINQ |
| Auth | JWT + Refresh tokens | Stateless, mobile-friendly |
| Real-time | SignalR | RSVP live updates |
| File storage | S3-compatible (MinIO/AWS) | Scalable, CDN-ready |
| Image processing | imgproxy | On-the-fly transforms |
| Search | Meilisearch | Instant template search |
| Analytics | PostHog (self-hosted or cloud) | Product analytics |
| Error tracking | Sentry | Error monitoring |
| CI/CD | GitHub Actions | Automated testing + deployment |
| Deployment | Vercel (web) + Railway/Fly.io (API) | Managed, scalable |
| Monorepo | Turborepo | Shared types, build orchestration |

### 15.4 ASP.NET Core API Structure

```csharp
// Domain Entities
public class Card : BaseEntity
{
    public long UserId { get; set; }
    public int TemplateId { get; set; }
    public int ThemeId { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? CustomSlug { get; set; }
    public CardStatus Status { get; set; }
    public JsonDocument Fields { get; set; } = null!;
    public List<string> Photos { get; set; } = new();
    public string? MusicUrl { get; set; }
    public List<ScheduleItem> Schedule { get; set; } = new();
    public DateTime? PublishedAt { get; set; }
    
    public User User { get; set; } = null!;
    public Template Template { get; set; } = null!;
    public Theme Theme { get; set; } = null!;
    public Category Category { get; set; } = null!;
    public ICollection<Rsvp> Rsvps { get; set; } = new List<Rsvp>();
}

// API Controller Example
[ApiController]
[Route("api/v1/[controller]")]
public class CardsController : ControllerBase
{
    private readonly ICardService _cardService;
    
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CardDto>> Create(CreateCardRequest request)
    {
        var card = await _cardService.CreateAsync(User.GetUserId(), request);
        return CreatedAtAction(nameof(Get), new { id = card.Id }, card);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<CardDto>> Get(long id)
    {
        var card = await _cardService.GetAsync(id);
        return card is null ? NotFound() : Ok(card);
    }
}

// Service Pattern (Clean Architecture)
public interface ICardService
{
    Task<CardDto> CreateAsync(long userId, CreateCardRequest request);
    Task<CardDto?> GetAsync(long id);
    Task<CardDto> UpdateAsync(long id, long userId, UpdateCardRequest request);
    Task PublishAsync(long id, long userId);
    Task DeleteAsync(long id, long userId);
}

// Authentication Flow
[HttpPost("auth/request-otp")]
public async Task<IActionResult> RequestOtp([FromBody] RequestOtpRequest request)
{
    var code = _otpService.Generate();
    await _smsService.SendAsync(request.Phone, code);
    await _cache.SetAsync($"otp:{request.Phone}", code, TimeSpan.FromMinutes(5));
    return Ok(new { message = "OTP sent" });
}

[HttpPost("auth/verify-otp")]
public async Task<ActionResult<AuthResponse>> VerifyOtp([FromBody] VerifyOtpRequest request)
{
    var cached = await _cache.GetAsync<string>($"otp:{request.Phone}");
    if (cached != request.Code) return Unauthorized();
    
    var user = await _userService.GetOrCreateAsync(request.Phone);
    var token = _jwtService.Generate(user);
    return Ok(new AuthResponse { Token = token, User = user });
}
```

### 15.5 Next.js Frontend Key Patterns

```tsx
// Server Component for invitation view (SSR)
async function InvitationPage({ params }: { params: { slug: string } }) {
  const data = await getInvitation(params.slug); // server-side fetch
  
  return (
    <InvitationLayout theme={data.card.theme}>
      <EventHero card={data.card} />
      <CountdownTimer date={data.card.fields.date} />
      <VenueSection venue={data.card.fields.venue} />
      <HostsSection hosts={data.card.fields.hosts} />
      <ScheduleTimeline schedule={data.card.schedule} />
      <RsvpForm cardId={data.card.id} />
    </InvitationLayout>
  );
}

// Client Component for RSVP form
'use client';
function RsvpForm({ cardId }: { cardId: number }) {
  const form = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
  });
  
  const submit = useMutation({
    mutationFn: (data) => api.post('/rsvp', { ...data, card_id: cardId }),
    onSuccess: () => toast.success('Response submitted!'),
  });
  
  return (
    <form onSubmit={form.handleSubmit(submit.mutate)}>
      <FormField control={form.control} name="guest_name" render={({ field }) => (
        <FormItem>
          <FormLabel>Your name</FormLabel>
          <FormControl><Input {...field} /></FormControl>
        </FormItem>
      )} />
      {/* ... */}
    </form>
  );
}
```

### 15.6 Component Mapping: Original → shadcn/ui

| Original | shadcn/ui | Customization |
|----------|-----------|---------------|
| Language Switcher | `Tabs` + `TabsList` + `TabsTrigger` | Pill-style, rounded-full |
| Theme Toggle | `Button` variant="ghost" | Sun/moon icons from Lucide |
| Category Card | Custom `Card` | Aspect-ratio 4/5, image overlay |
| Design Carousel | Custom `Carousel` | Snap-scroll, video on hover |
| Partner CTA | Custom `Card` variant | Border, icon, badge |
| RSVP Form | `Form` + `Input` + `Select` + `Button` | Zod validation |
| Blog Post | Custom `Article` | MDX rendering |
| Drawer | `Drawer` (Vaul) | iOS-style bottom sheet |
| Badge | `Badge` variant="secondary" | Pill, backdrop-blur |
| Toast | `Toast` (Sonner) | Success/error notifications |
| Dialog | `Dialog` | Modal for confirmations |
| Skeleton | `Skeleton` | Loading states |

### 15.7 CSS Architecture

```css
/* tailwind.config.ts */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(96.2% 0.018 272.314)',
          // ... full indigo scale
          500: 'oklch(58.5% 0.233 277.117)',
        },
        // ... semantic tokens
      },
      fontFamily: {
        display: ['Comfortaa', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        body: ['Jost', 'sans-serif'],
        cursive: ['Great Vibes', 'cursive'],
      },
      animation: {
        'blob-a': 'blob-a 22s ease-in-out infinite',
        'blob-b': 'blob-b 28s ease-in-out infinite',
        'blob-c': 'blob-c 26s ease-in-out infinite',
        'shimmer': 'shimmer 6.8s ease-in-out infinite',
        'sun-glow': 'sun-glow 2.6s ease-in-out infinite',
      },
    },
  },
};
```

### 15.8 Implementation Phases

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **1. Foundation** | 2 weeks | Monorepo (Turborepo), Next.js + ASP.NET Core setup, PostgreSQL, CI/CD, auth |
| **2. Design System** | 1.5 weeks | shadcn/ui setup, Tailwind config, color tokens, typography, theme toggle |
| **3. Landing Page** | 2 weeks | Hero, design showcase, category grid, partner CTA, responsive |
| **4. Invitation View** | 2 weeks | SSR invitation page, countdown, venue, hosts, schedule, RSVP form |
| **5. Card Editor** | 3 weeks | Multi-step wizard, text fields, photo upload, music, preview |
| **6. Template System** | 1.5 weeks | Admin CRUD, category management, theme configuration |
| **7. Blog + SEO** | 1.5 weeks | Blog listing/detail, JSON-LD, Open Graph, sitemap |
| **8. Payments** | 1 week | Kaspi Pay integration, slug rental, promo codes |
| **9. WebGL Themes** | 2 weeks | Three.js Floral, Daylight scroll, Altyn 3D heart, Kazakh SVG |
| **10. Polish + QA** | 2 weeks | E2E tests (Playwright), accessibility audit, performance optimization |
| **Total** | ~18 weeks | Production-ready MVP |

### 15.9 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm turbo lint typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres: { image: postgres:16, env: { POSTGRES_PASSWORD: test } }
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm turbo test
      - run: dotnet test

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm turbo build
      - run: npx playwright install
      - run: npx playwright test
```

### 15.10 Clean Code Principles

| Principle | Application |
|-----------|-------------|
| **SOLID** | Single-responsibility services, interface-based DI, Open/Closed theme system |
| **KISS** | shadcn/ui components over custom implementations, server components by default |
| **DRY** | Shared types in `packages/shared`, reusable shadcn/ui components |
| **Clean Architecture** | Domain → Application → Infrastructure → API layering |
| **12-Factor App** | Environment-based config, stateless services, disposability |

---

*Audit completed July 2026. Based on live site inspection + saved HTML snapshot analysis.*
