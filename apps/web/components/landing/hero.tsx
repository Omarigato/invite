import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Link2, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col gap-8 lg:w-[58%] xl:w-3/5">
      {/* Desktop hero */}
      <div className="relative hidden w-full lg:block">
        <div className="pointer-events-none absolute -z-0 h-[65dvh] w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-start text-left">
          <h1 className="mb-7 text-2xl font-bold tracking-tight text-foreground xl:text-4xl font-[family-name:var(--font-display)]">
            Выберите дизайн, добавьте текст и отправьте гостям.
          </h1>
          <p className="mb-6 text-xl text-muted-foreground xl:text-2xl">
            Создайте красивое и удобное онлайн-приглашение за 5 минут.
          </p>
          <ul className="mt-6 space-y-2 text-lg text-muted-foreground xl:text-xl">
            <li>✔ Создайте приглашение за 3 минуты</li>
            <li>✔ Добавьте фото и музыку сами</li>
            <li>✔ Отправьте гостям!</li>
            <li>✔ Очень просто!</li>
            <li>✔ Создайте с телефона</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="default">
              <Sparkles className="h-4 w-4" />
              от 1000 ₸ с спонсором
            </Badge>
            <Badge variant="default">
              <Link2 className="h-4 w-4" />
              <span className="flex flex-col leading-tight">
                <span>Персональная ссылка — бесплатно</span>
                <span className="font-mono text-[11px] text-primary-400">shaqyrtu.kz/i/<span className="font-medium">jessia-john</span></span>
              </span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Design showcase */}
      <DesignShowcase />

      {/* Partner CTA */}
      <PartnerCTA />
    </section>
  );
}

function DesignShowcase() {
  const themes = [
    { name: "Daylight", color: "#e2a93f" },
    { name: "Altyn (Premium)", color: "#c9a23f" },
    { name: "Floral", color: "#d48a96" },
    { name: "Kazakh Ornament", color: "#8c6229" },
  ];

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-bold text-foreground sm:text-xl font-[family-name:var(--font-display)]">Дизайны</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Каждый стиль в движении</p>
      </div>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-3 pt-1 sm:gap-4 sm:px-6 lg:mx-0 lg:overflow-x-visible lg:px-0">
        {themes.map((theme) => (
          <a
            key={theme.name}
            href={`/theme/${theme.name.toLowerCase().replace(/[^a-z]/g, "")}`}
            className="group relative aspect-[720/1464] w-[48vw] max-w-[240px] shrink-0 snap-start overflow-hidden rounded-xl border border-border transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] lg:w-40"
            style={{ background: `linear-gradient(160deg, ${theme.color}88 0%, ${theme.color}44 55%, ${theme.color}18 100%)` }}
          >
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-3 pb-2.5 pt-8">
              <span className="text-[13px] font-semibold text-white drop-shadow-sm sm:text-sm">{theme.name}</span>
            </div>
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
              <span className="text-xs">▶</span> Смотреть демо
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function PartnerCTA() {
  return (
    <a
      href="#partner"
      className="group mt-8 flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/40 p-3.5 text-left transition-all hover:bg-muted/70 max-w-lg"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500">
        💰
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">Заработать</p>
        <p className="text-sm font-medium text-foreground leading-snug">Зарабатывайте с промокодами</p>
        <p className="text-xs text-muted-foreground leading-snug">30% за активацию</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-500 px-3.5 py-2 text-xs font-semibold text-white">
        Подробнее <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </a>
  );
}
