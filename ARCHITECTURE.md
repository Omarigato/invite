# Shaqyrtu.kz — Full-Stack Architecture Analysis

> Senior architect review based on the saved HTML snapshot + live site inspection.
> No proprietary source code is reproduced. This is a clean reference analysis for
> building an equivalent application with improved architecture.

---

## 1. Product Summary

**Shaqyrtu** (Қазақша "шақыру" — "to invite") is a SaaS platform for creating digital invitations for Kazakh celebrations. Users pick a template, customise text/photos/music, and share a personal link via WhatsApp or other channels. Guests RSVP through the link.

### Key User-Facing Features

| Feature | Description |
|---------|-------------|
| Template gallery | Categorized invitation designs (Wedding, Kyz Uzatu, Tusaukeser, Besik Toi, Betashar, Kudalyk, Aska Shakyru, Sundetoy, Anniversary) — each category has ~5 templates |
| Card editor | `/new_card_config?template=<id>&theme=<theme>` — multi-step form: fill text fields, upload photos, choose music, preview |
| Design themes | 4 visual themes: **Daylight**, **Altyn (premium)**, **Floral**, **Kazakh ornament** |
| Personal shareable link | `/i/<username>` — free tier, short vanity URL |
| Pricing | From 1000 KZT with sponsor; premium "Altyn" theme |
| Partner/affiliate program | 30% revenue share per promo code activation |
| Blog | `/blog` — content marketing |
| Terms | `/terms` — Personal Data Processing Agreement |
| Language switcher | KZ / RU / EN (client-side via Nuxt i18n) |
| Dark mode | System-preference + manual toggle |
| RSVP | Guest confirmation through the shared invitation link |

---

## 2. Frontend Architecture

### 2.1 Technology Stack

| Layer | Technology | Evidence |
|-------|-----------|----------|
| Framework | **Nuxt 3** (Vue 3) | `__nuxt` div, `/_nuxt/` asset paths, `router-link-active` classes, `data-v-*` scoped styles |
| UI Library | **Nuxt UI** (v3) | `@layer theme` with `--ui-color-*` variables, `data-slot` attributes (`base`, `list`, `trigger`, `label`, `root`), Reka UI primitives |
| CSS | **Tailwind CSS v4** | `@layer theme`, oklch color system, utility classes throughout, `@media(min-width:1024px)` breakpoints |
| Icons | **Iconify** (Lucide + Heroicons + MDI) | `.i-lucide:*`, `.i-heroicons:*`, `.i-mdi:*` CSS icon classes |
| Fonts | **Google Fonts** | `<link rel="preconnect" href="https://fonts.googleapis.com">` — two fonts used: primary (sans-serif) + secondary (serif/display) |
| State Management | **Nuxt built-in** (useState, composables) | SPA-style client hydration, `__NUXT_COLOR_MODE__` global |
| Color Mode | **@nuxtjs/color-mode** | `class="light"`, `nuxt-color-mode` localStorage key, system preference detection |
| Routing | **Nuxt file-based router** | `/new_card_config`, `/blog`, `/terms`, `/theme/<name>`, `/i/<slug>` |
| Build | **Nuxt auto** (Vite) | Hash-named chunks: `DUmLsAhS.js`, `CDGRqsZO.css`, `builds/meta/<uuid>.json` |

### 2.2 Page Routes (Inferred)

| Route | Purpose |
|-------|---------|
| `/` | Landing page (SSR) |
| `/new_card_config?template=<id>&theme=<theme>` | Card creation wizard |
| `/blog` | Blog listing |
| `/blog/<slug>` | Blog post detail |
| `/theme/floral` (etc.) | Theme showcase / detail pages |
| `/i/<username>` | Public shared invitation view |
| `/terms` | Legal / privacy |
| `/<locale>/...` | Locale-prefixed routes (KZ, RU, EN) |

### 2.3 Landing Page Structure

The landing is a single SSR page with these sections:

1. **Header** — Logo + brand link, language switcher (KZ/RU/EN tabs via Reka UI Tabs), dark mode toggle
2. **Hero** — Heading, subtext, 5 benefit bullet points, pricing badge ("from 1000 KZT"), personal link badge
3. **Design Showcase** — Horizontal scrollable card carousel (4 themes), each with thumbnail + video preview (lazy-loaded on hover), "View demo" badge, dot pagination on mobile
4. **Partner Program CTA** — Desktop-only banner with banknotes icon, "30% per activation"
5. **Categories Grid** — 2-column masonry of 9 event categories, each with cover image (from `api.shaqyrtu.kz/storage/categories/covers/`), title, template count, arrow icon
6. **Partner Program CTA** — Mobile version of the same banner
7. **Footer** — Theme info link, blog link, developer credit ("made by abmco.kz"), Instagram link, terms link

### 2.4 Component Architecture (Inferred)

Vue scoped styles reveal component boundaries via `data-v-*` hashes:

| Component | Hash | Purpose |
|-----------|------|---------|
| `LandingAmbient` | `2b68f3f5` | Background animated blobs (3 blobs with keyframe animations, `prefers-reduced-motion` respected) |
| `GeneratedCover` | `c983a461` | Procedural cover image generator with CSS-only effects: orbs, grain texture, shine shimmer, gradient surfaces, accent colors |
| `IosDrawer` | `7c7ca093` | iOS-style bottom drawer (likely for mobile menu or design preview) |
| `Scrollable` | `Dkb7H70k` | Horizontal scroll container with snap points |
| `GalleryPreviewProvider` | `C65Pb2xA` | Lazy video preview on design cards |
| `SvgDecor` | `C9cJueD0` | SVG decorative elements |
| `Envelope` | `BDcn7fQn` | Envelope animation/visual (invitation metaphor) |
| `FloralBloom` | `zazsV8U9` | Floral theme animation |
| `Altyn` | `CCYmLdXi` | Altyn (gold) premium theme styles |
| `DaylightNight` | `CfUpXmA3` | Daylight theme styles |
| `UseIntroAutoStart` | `K6AcJWZF` | Auto-start intro animation composable |

### 2.5 Design System

#### Color Palette (oklch)

| Token | Color | Usage |
|-------|-------|-------|
| `primary` | Indigo 50-950 | Main brand actions, badges |
| `secondary` | Blue 50-950 | Secondary elements |
| `success` | Green 50-950 | Confirmations |
| `warning` | Yellow 50-950 | Caution states |
| `error` | Red 50-950 | Error states |
| `neutral` | Gray 50-950 | Text, borders |

Accent colors per theme:
- **Floral**: `#FEF5F8` → `#F0C8D8` (pink gradient), accent `#9C3868`
- **Daylight**: warm gold tones
- **Altyn**: premium gold `#c9a23f`
- **Kazakh ornament**: earth tones `#8c6229`

#### Typography

- **Primary font** (sans-serif): Used for body, headings
- **Secondary font** (serif/display): Used for card titles (`font-secondary`)
- Both loaded from Google Fonts

#### Spacing & Layout

- Max width: `max-w-7xl` (1280px) / `max-w-screen-xl`
- Grid: `grid-cols-2` for category cards
- Responsive: `sm:`, `lg:`, `xl:` breakpoints
- Mobile-first with `max-lg:` overrides

#### Animations

| Animation | Duration | Trigger |
|-----------|----------|---------|
| Ambient blob movement | 22-28s cycle | Always (reduced motion: disabled) |
| Card hover scale | 300ms | Hover |
| Generated cover shine | 6.8s cycle | Hero only |
| Category card shadow | 300ms | Hover |
| Video preview fade-in | 500ms | Hover |
| Scroll snap | CSS scroll-snap | Mobile carousel |

### 2.6 GeneratedCover Component (Deep Analysis)

This is a sophisticated **CSS-only procedural cover** generator — no canvas or images for some variants:

- **Surface**: Dual radial gradients (white highlight + warm color)
- **Grain**: SVG `feTurbulence` noise filter at 4% opacity
- **Orbs**: 2 blurred circles with `color-mix()` blending, positioned top-right and bottom-left
- **Frame**: Border with glass inset effect
- **Shine**: Gradient overlay animated via `translate(-145%)` to `(145%)` — shimmer sweep
- **Glow**: Radial white gradient behind center icon
- Two variants: `--hero` (larger, animated shine) and `--card` (smaller, no grain, static)

### 2.7 SEO & Metadata

| Tag | Value |
|-----|-------|
| `<title>` | "Shaqyrtu — digital invitations for Kazakh celebrations" |
| `meta description` | "Online invites for weddings, qyz uzatu, besik toy. Templates, WhatsApp sharing, RSVP. from 1000 KZT with a sponsor." |
| `theme-color` | `#4f46e5` (indigo-600) |
| `canonical` | `https://shaqyrtu.kz/` |
| Open Graph | Full: type, site_name, url, image (1200x630), title, description |
| Twitter Card | `summary_large_image` |
| Structured Data | JSON-LD: Organization + WebSite + Service (schema.org) |
| Favicons | `.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` |
| PWA | `site.webmanifest` present |
| Fonts | Preconnected to Google Fonts |

#### Structured Data Highlights

- **Organization**: name, logo, image, description, `areaServed: Kazakhstan`, `knowsLanguage: [kk, ru, en]`, social links (Instagram, Threads, Telegram bot)
- **Service**: "Digital invitation design", AggregateOffer 1000-20000 KZT
- **WebSite**: publisher reference

---

## 3. Backend Architecture (Inferred)

### 3.1 API Server

| Aspect | Detail |
|--------|--------|
| Base URL | `https://api.shaqyrtu.kz` |
| Storage | `/storage/categories/covers/<hash>.jpg` and `.webp` — Laravel-style file storage with hashed names |
| Likely Framework | **Laravel** (PHP) — evidenced by storage path pattern, common in KZ market |

### 3.2 Inferred API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/categories` | List event categories with cover images |
| `GET` | `/api/templates` | List templates, filterable by category/theme |
| `GET` | `/api/templates/:id` | Single template details |
| `GET` | `/api/themes` | Available design themes |
| `POST` | `/api/cards` | Create a new invitation card |
| `PUT` | `/api/cards/:id` | Update card content |
| `GET` | `/api/cards/:id/preview` | Generate preview |
| `POST` | `/api/cards/:id/publish` | Publish and generate shareable link |
| `GET` | `/api/i/:slug` | Public invitation view (guest-facing) |
| `POST` | `/api/rsvp` | Guest RSVP submission |
| `GET` | `/api/blog` | Blog posts listing |
| `GET` | `/api/blog/:slug` | Blog post detail |
| `POST` | `/api/auth/login` | Phone/email authentication |
| `POST` | `/api/auth/verify` | OTP verification |
| `GET` | `/api/user/cards` | User's saved cards |
| `GET` | `/api/pricing` | Pricing plans |
| `POST` | `/api/promo/activate` | Activate promo code |
| `GET` | `/api/partner/stats` | Partner earnings dashboard |

### 3.3 Storage Architecture

```
api.shaqyrtu.kz/storage/
├── categories/
│   └── covers/
│       ├── <hash>.jpg      # Original
│       └── <hash>.webp     # WebP variant
├── templates/
│   └── <hash>.*            # Template preview images
├── uploads/
│   └── <user>/<card>/      # User-uploaded photos
└── ...
```

File naming: Laravel-style random hashes (e.g., `nXEqJlRMaASbhtTlgLE6Rhe723J1DBglHgkFZDnA`).

### 3.4 Inferred Database Schema

#### users
| Column | Type | Notes |
|--------|------|-------|
| id | bigint PK | |
| phone | varchar | Primary auth method (KZ market) |
| email | varchar? | Optional |
| name | varchar | |
| username | varchar | Unique — used in `/i/<username>` links |
| role | enum | user / partner / admin |
| locale | enum | kk / ru / en |
| created_at | timestamp | |

#### categories
| Column | Type | Notes |
|--------|------|-------|
| id | int PK | |
| slug | varchar | |
| name_kk | varchar | |
| name_ru | varchar | |
| name_en | varchar | |
| cover_image | varchar | Path to cover |
| template_count | int | Denormalized |
| sort_order | int | |

#### templates
| Column | Type | Notes |
|--------|------|-------|
| id | int PK | |
| category_id | FK → categories | |
| theme_id | FK → themes | |
| name | varchar | |
| preview_image | varchar | |
| fields_schema | json | Defines editable fields |
| is_premium | bool | Altyn theme flag |

#### themes
| Column | Type | Notes |
|--------|------|-------|
| id | int PK | |
| slug | varchar | daylight / altyn / floral / kazakh |
| name | varchar | |
| is_premium | bool | |

#### cards (invitations)
| Column | Type | Notes |
|--------|------|-------|
| id | bigint PK | |
| user_id | FK → users | |
| template_id | FK → templates | |
| theme_id | FK → themes | |
| category_id | FK → categories | |
| title | varchar | Event title |
| slug | varchar | Unique share slug |
| fields | json | User-filled text fields |
| photos | json | Array of uploaded photo URLs |
| music_url | varchar? | Background music |
| status | enum | draft / published / archived |
| share_link | varchar | `/i/<slug>` |
| created_at | timestamp | |
| published_at | timestamp? | |

#### rsvps
| Column | Type | Notes |
|--------|------|-------|
| id | bigint PK | |
| card_id | FK → cards | |
| guest_name | varchar | |
| guest_phone | varchar? | |
| attending | bool | |
| message | text? | |
| created_at | timestamp | |

#### promo_codes
| Column | Type | Notes |
|--------|------|-------|
| id | bigint PK | |
| code | varchar | Unique |
| partner_id | FK → users | |
| discount_percent | int | Default 30 |
| usage_count | int | |
| max_uses | int? | |

#### blog_posts
| Column | Type | Notes |
|--------|------|-------|
| id | int PK | |
| slug | varchar | Unique |
| title | varchar | |
| body | longtext (HTML) | |
| cover_image | varchar | |
| published_at | timestamp | |
| seo_title | varchar? | |
| seo_description | text? | |

---

## 4. Analytics & Third-Party Integrations

| Service | Purpose | Evidence |
|---------|---------|----------|
| **PostHog** | Product analytics, session recording, surveys, feature flags | JS files: `posthog-recorder.js`, `surveys.js`, `dead-clicks-autocapture.js`, `web-vitals.js`, `tracing-headers.js`, `exception-autocapture.js` |
| **Google Fonts** | Typography | Preconnect links |
| **Google/Apple** | PWA manifests | `site.webmanifest`, `apple-touch-icon.png` |
| **Instagram** | Social / marketing | `@shaqyrtu.service` linked |
| **Threads** | Social / marketing | `@shaqyrtu.service` linked |
| **Telegram Bot** | Customer support | `@shaqyrtu_kz_abmco_bot` |

### PostHog Feature Set

The 6 PostHog JS bundles indicate a comprehensive analytics setup:
- **Autocapture**: Click/scroll/form tracking
- **Dead Click Detection**: Identifies UI elements users click that aren't interactive
- **Session Recording**: `posthog-recorder.js` — session replay
- **Surveys**: In-app surveys/feedback
- **Web Vitals**: LCP, FID, CLS performance tracking
- **Tracing Headers**: Distributed tracing
- **Exception Autocapture**: Automatic error tracking

---

## 5. User Flows

### 5.1 Primary Flow: Create Invitation

```
Landing Page
    ↓
Pick Category (grid) or Theme (carousel)
    ↓
/new_card_config?template=<id>&theme=<floral>
    ↓
Step 1: Choose specific template variant
Step 2: Fill text fields (event name, date, time, venue, hosts)
Step 3: Upload photos
Step 4: Choose background music
Step 5: Preview card
Step 6: Publish
    ↓
Receive shareable link: shaqyrtu.kz/i/<slug>
    ↓
Share via WhatsApp / Messenger
    ↓
Guests open link → see invitation → RSVP
```

### 5.2 Guest Flow

```
Receive link (WhatsApp/SMS)
    ↓
Open shaqyrtu.kz/i/<slug>
    ↓
View invitation (full-screen, mobile-optimized)
    ↓
RSVP (confirm attendance + message)
    ↓
Optional: Add to calendar
```

### 5.3 Partner Flow

```
Learn about program (landing CTA)
    ↓
Register as partner
    ↓
Receive promo code
    ↓
Share code with users
    ↓
Users activate code → 30% revenue share
    ↓
Dashboard: track activations + earnings
```

---

## 6. Responsive Design Analysis

### Breakpoints

| Token | Width | Behavior |
|-------|-------|----------|
| Default | < 640px | Mobile: single column, bottom nav patterns |
| `sm` | 640px | Small tablet: adjusted spacing |
| `lg` | 1024px | Desktop: 2-column layout, sidebar categories |
| `xl` | 1280px | Large desktop: max-width container |

### Mobile-First Patterns

- Sticky header with backdrop blur on scroll
- Bottom drawer (iOS-style) for navigation
- Horizontal snap carousel for design showcase
- Dot pagination indicators
- Touch-optimized: `touch-action: manipulation`, `will-change: transform`
- `min-h-dvh` for full viewport height

### Desktop Patterns

- Two-column hero layout (text left, categories right)
- Ambient animated background blobs
- Grid background pattern with radial mask
- Hover video previews on design cards

---

## 7. Performance Characteristics

### Observed Optimizations

| Technique | Implementation |
|-----------|---------------|
| **Lazy loading** | `loading="lazy"` on images, video `preload="auto"` with opacity transition |
| **WebP** | `<picture>` with `<source srcset="...webp">` fallback to JPG |
| **Code splitting** | ~35 JS chunks preloaded via `<link rel="modulepreload">` |
| **Critical CSS** | Inline styles for above-the-fold content |
| **Font loading** | Preconnect hints for Google Fonts |
| **Reduced motion** | `prefers-reduced-motion: no-preference` media query for animations |
| **Image optimization** | `decoding="async"`, `object-cover`, responsive sizing |
| **Build manifest** | UUID-based asset hashing for cache busting |
| **Backdrop optimization** | `will-change: transform` on animated elements |

### Potential Issues

1. **35+ JS module preloads** — could cause network contention on initial load
2. **Video preloads** — 4 design demo videos loading eagerly (`preload="auto"`)
3. **Large CSS** — `entry.CDGRqsZO.css` at 363KB, `index.isgKWlNQ.css` at 42KB

---

## 8. Inferred Monetization Model

| Tier | Price | Features |
|------|-------|----------|
| **Free** | 0 KZT | Personal link (`/i/<username>`), basic templates |
| **Standard** | 1000 KZT+ | Premium templates, custom domain, no watermark |
| **Altyn (Premium)** | Higher | Gold-themed templates, priority support |
| **Partner** | Revenue share | 30% per activation via promo codes |

---

## 9. Implementation Plan: Building an Equivalent Application

### 9.1 Recommended Tech Stack (Improved)

| Layer | Original | Recommended |
|-------|----------|-------------|
| Frontend | Nuxt 3 + Nuxt UI + Tailwind | **Nuxt 3** + **Nuxt UI Pro** + **Tailwind CSS v4** (keep — excellent choice) |
| Backend API | Laravel (inferred) | **Laravel 11** + **Sanctum** for API auth |
| Database | MySQL (inferred) | **PostgreSQL 16** (better JSON support, full-text search) |
| File Storage | Local/S3 (inferred) | **AWS S3** + **CloudFront CDN** + **imgproxy** for on-the-fly image transforms |
| Search | Unknown | **Meilisearch** for template/category search |
| Auth | Phone OTP (inferred) | **Laravel Fortify** + **SMS gateway** (Twilio/KazTransCom) |
| Payments | Unknown | **Kaspi Pay** / **Freedom Pay** (KZ market) + **Stripe** fallback |
| Analytics | PostHog | **PostHog** (keep — excellent choice) + **Plausible** for privacy-first web analytics |
| Hosting | Unknown | **Vercel** (Nuxt) + **Laravel Cloud** or **Forge** |
| CI/CD | Unknown | **GitHub Actions** |
| Monitoring | Unknown | **Sentry** for error tracking + **UptimeRobot** |

### 9.2 Project Structure

```
shaqyrtu/
├── apps/
│   ├── web/                    # Nuxt 3 frontend
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   │   ├── AmbientBackground.vue
│   │   │   │   ├── DesignShowcase.vue
│   │   │   │   ├── CategoryGrid.vue
│   │   │   │   └── PartnerCTA.vue
│   │   │   ├── card/
│   │   │   │   ├── CardEditor.vue
│   │   │   │   ├── TextField.vue
│   │   │   │   ├── PhotoUpload.vue
│   │   │   │   ├── MusicPicker.vue
│   │   │   │   └── CardPreview.vue
│   │   │   ├── shared/
│   │   │   │   ├── GeneratedCover.vue
│   │   │   │   ├── Scrollable.vue
│   │   │   │   ├── ThemeSwitcher.vue
│   │   │   │   └── LanguageSwitcher.vue
│   │   │   └── invitation/
│   │   │       ├── InvitationView.vue
│   │   │       └── RsvpForm.vue
│   │   ├── composables/
│   │   │   ├── useCardEditor.ts
│   │   │   ├── useShareLink.ts
│   │   │   └── useRsvp.ts
│   │   ├── pages/
│   │   │   ├── index.vue
│   │   │   ├── new_card_config.vue
│   │   │   ├── blog/
│   │   │   ├── theme/[slug].vue
│   │   │   └── i/[slug].vue
│   │   └── nuxt.config.ts
│   │
│   └── api/                    # Laravel 11 backend
│       ├── app/
│       │   ├── Models/
│       │   │   ├── User.php
│       │   │   ├── Card.php
│       │   │   ├── Template.php
│       │   │   ├── Theme.php
│       │   │   ├── Category.php
│       │   │   ├── Rsvp.php
│       │   │   ├── PromoCode.php
│       │   │   └── BlogPost.php
│       │   ├── Http/
│       │   │   ├── Controllers/
│       │   │   │   ├── CardController.php
│       │   │   │   ├── TemplateController.php
│       │   │   │   ├── InvitationController.php
│       │   │   │   ├── RsvpController.php
│       │   │   │   ├── AuthController.php
│       │   │   │   ├── PartnerController.php
│       │   │   │   └── BlogController.php
│       │   │   └── Requests/
│       │   └── Services/
│       │       ├── ImageService.php
│       │       ├── ShareLinkService.php
│       │       └── SmsService.php
│       ├── database/
│       │   ├── migrations/
│       │   └── seeders/
│       ├── routes/
│       │   └── api.php
│       └── config/
│
├── packages/
│   └── shared/                 # Shared types & constants
│       ├── types/
│       └── constants/
│
└── docker-compose.yml
```

### 9.3 API Specification (OpenAPI-style)

```yaml
openapi: 3.1.0
info:
  title: Shaqyrtu API
  version: 1.0.0

paths:
  /api/categories:
    get:
      summary: List event categories
      responses:
        200:
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Category'

  /api/templates:
    get:
      summary: List templates
      parameters:
        - name: category_id
          in: query
        - name: theme
          in: query
        - name: is_premium
          in: query

  /api/cards:
    post:
      summary: Create invitation card
      security:
        - bearerAuth: []

  /api/cards/{id}:
    put:
      summary: Update card
      security:
        - bearerAuth: []

  /api/cards/{id}/publish:
    post:
      summary: Publish card, generate share link

  /api/i/{slug}:
    get:
      summary: Public invitation view (no auth)

  /api/rsvp:
    post:
      summary: Submit RSVP for an invitation

components:
  schemas:
    Category:
      type: object
      properties:
        id: { type: integer }
        slug: { type: string }
        name: { type: string }
        cover_url: { type: string, format: uri }
        template_count: { type: integer }

    Card:
      type: object
      properties:
        id: { type: integer }
        template_id: { type: integer }
        theme: { type: string }
        title: { type: string }
        slug: { type: string }
        fields: { type: object }
        photos: { type: array, items: { type: string } }
        music_url: { type: string, nullable: true }
        status: { type: string, enum: [draft, published, archived] }
        share_url: { type: string, format: uri }
```

### 9.4 Key Improvements Over Original

| Area | Original | Improvement |
|------|----------|-------------|
| **Image handling** | Static storage paths | **imgproxy** for on-the-fly transforms (WebP/AVIF, resize, blur) |
| **SEO** | Client-side locale switch | **SSR + i18n middleware** with `hreflang` tags per locale |
| **Performance** | 35+ JS preloads | **Route-based code splitting** with dynamic imports |
| **Video previews** | 4 videos preloaded | **Intersection Observer** lazy-load + reduced quality previews |
| **Search** | None visible | **Meilisearch** for instant template search |
| **Accessibility** | Basic ARIA | Full **WCAG 2.1 AA**: focus management, screen reader testing, keyboard navigation |
| **Analytics** | PostHog only | PostHog + **Plausible** (privacy) + **Sentry** (errors) |
| **Pricing** | Manual | **Kaspi Pay API** integration for instant KZ payments |
| **Realtime** | Polling likely | **Laravel Reverb** (WebSocket) for live RSVP notifications |
| **Testing** | Unknown | **Vitest** (frontend) + **Pest** (backend) + **Playwright** (E2E) |
| **Monorepo** | Separate repos likely | **Turborepo** for shared types, constants, build orchestration |
| **CI/CD** | Unknown | **GitHub Actions** with preview deploys per PR |

### 9.5 Database Migrations (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'partner', 'admin')),
    locale VARCHAR(5) DEFAULT 'ru',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_kk VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    cover_url TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- Themes
CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    css_variables JSONB NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE
);

-- Templates
CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id),
    theme_id INT REFERENCES themes(id),
    name VARCHAR(255) NOT NULL,
    preview_url TEXT NOT NULL,
    fields_schema JSONB NOT NULL DEFAULT '[]',
    is_premium BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0
);

-- Cards (invitations)
CREATE TABLE cards (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    template_id INT REFERENCES templates(id),
    theme_id INT REFERENCES themes(id),
    category_id INT REFERENCES categories(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    fields JSONB DEFAULT '{}',
    photos JSONB DEFAULT '[]',
    music_url TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVPs
CREATE TABLE rsvps (
    id BIGSERIAL PRIMARY KEY,
    card_id BIGINT REFERENCES cards(id) ON DELETE CASCADE,
    guest_name VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20),
    attending BOOLEAN NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promo codes
CREATE TABLE promo_codes (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    partner_id BIGINT REFERENCES users(id),
    discount_percent INT DEFAULT 30,
    usage_count INT DEFAULT 0,
    max_uses INT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    cover_url TEXT,
    published_at TIMESTAMPTZ,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_cards_slug ON cards(slug);
CREATE INDEX idx_cards_status ON cards(status);
CREATE INDEX idx_rsvps_card_id ON rsvps(card_id);
CREATE INDEX idx_templates_category ON templates(category_id);
CREATE INDEX idx_templates_theme ON templates(theme_id);
CREATE INDEX idx_promo_codes_partner ON promo_codes(partner_id);
```

### 9.6 Estimated Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Foundation** | 2 weeks | Monorepo setup, CI/CD, DB schema, auth |
| **Template System** | 2 weeks | Admin panel, template CRUD, cover generator |
| **Card Editor** | 3 weeks | Multi-step wizard, photo upload, music, preview |
| **Guest View** | 1 week | Public invitation page, RSVP flow |
| **Landing + Marketing** | 2 weeks | Landing page, blog, SEO, analytics |
| **Partner System** | 1 week | Promo codes, dashboard, earnings |
| **Payments** | 1 week | Kaspi Pay integration, pricing tiers |
| **Polish + QA** | 2 weeks | E2E tests, accessibility, performance |
| **Total** | ~14 weeks | Production-ready MVP |

---

## 10. Architectural Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Single API domain (`api.shaqyrtu.kz`) | CORS issues, tight coupling | Separate API subdomain with proper CORS headers |
| Local file storage | Scaling bottleneck | S3 + CDN from day 1 |
| No visible rate limiting | Abuse potential | Laravel RateLimiter on all public endpoints |
| PostHog session recording | Privacy concerns (GDPR/KZ law) | Consent banner, anonymize IPs, respect Do Not Track |
| Client-side locale switching | SEO impact (no `hreflang`) | Server-side i18n with `hreflang` tags |
| Phone-only auth | Excludes some users | Add email + social login (Google, Apple) |

---

*Analysis completed July 2026. Based on saved HTML snapshot + live site inspection.*
