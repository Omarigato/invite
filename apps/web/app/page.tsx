import { AmbientBackground } from "@/components/landing/ambient-background";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CategoryGrid } from "@/components/landing/category-grid";

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh bg-white dark:bg-gray-950">
      <AmbientBackground />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Header />

        <div className="flex flex-col gap-8 py-6 lg:flex-row lg:gap-12 lg:py-10">
          {/* Left: Hero */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Mobile badges */}
            <div className="flex flex-wrap gap-2 lg:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                ✨ от 1000 ₸
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                🔗.shaqyrtu.kz/i/jessia-john
              </span>
            </div>

            {/* Desktop hero */}
            <div className="hidden lg:block">
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white xl:text-4xl">
                Выберите дизайн, добавьте текст и отправьте гостям.
              </h1>
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
                Создайте красивое и удобное онлайн-приглашение за 5 минут.
              </p>
              <ul className="space-y-1 text-base text-gray-600 dark:text-gray-400">
                <li>✔ Создайте приглашение за 3 минуты</li>
                <li>✔ Добавьте фото и музыку сами</li>
                <li>✔ Отправьте гостям!</li>
                <li>✔ Очень просто!</li>
                <li>✔ Создайте с телефона</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                  ✨ от 1000 ₸ с спонсором
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                  🔗 Персональная ссылка — бесплатно
                </span>
              </div>
            </div>

            {/* Design showcase */}
            <DesignShowcase />

            {/* Partner CTA */}
            <a href="#partner" className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-lg">
                💰
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">Заработать</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Зарабатывайте с промокодами — 30%</p>
              </div>
              <span className="shrink-0 rounded-full bg-indigo-500 px-3 py-2 text-xs font-semibold text-white">
                Подробнее →
              </span>
            </a>
          </div>

          {/* Right: Categories */}
          <div className="lg:w-[45%]">
            <CategoryGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DesignShowcase() {
  const themes = [
    { name: "Daylight", slug: "daylight", color: "#e2a93f" },
    { name: "Altyn", slug: "altyn", color: "#c9a23f" },
    { name: "Floral", slug: "floral", color: "#d48a96" },
    { name: "Kazakh", slug: "kazakh", color: "#8c6229" },
  ];

  return (
    <section>
      <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Дизайны</h2>
      <p className="mb-3 text-sm text-gray-500">Каждый стиль в движении</p>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {themes.map((theme) => (
          <a
            key={theme.name}
            href={`/theme/${theme.slug}`}
            className="group relative h-44 w-32 shrink-0 overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-52 sm:w-36"
            style={{ background: `linear-gradient(160deg, ${theme.color}88 0%, ${theme.color}44 55%, ${theme.color}18 100%)` }}
          >
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8">
              <span className="text-sm font-semibold text-white">{theme.name}</span>
            </div>
            <span className="absolute left-2 top-2 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white">
              ▶ демо
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
