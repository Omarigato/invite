import { notFound } from "next/navigation";

const themes: Record<string, { name: string; tagline: string; description: string; features: string[]; tech: string }> = {
  floral: {
    name: "Floral",
    tagline: "Цветы на экране — не картинка. Они растут на вашем GPU.",
    description: "Floral — это WebGL-дизайн. Цветы не являются изображением или GIF: они отрисовываются процедурно и растут в реальном времени на GPU вашего устройства. Каждый прокрутка заставляет ленту цветов следовать за пальцем.",
    features: ["Живая лента", "Букет RSVP", "Замкнутый цикл"],
    tech: "Three.js, GLSL shaders, procedural animation",
  },
  daylight: {
    name: "Daylight",
    tagline: "Небо открывается, солнце восходит — затем имена загораются.",
    description: "Daylight — это дизайн о свете и радости. Когда вы открываете приглашение, облака раздвигаются и небо открывается; затем два имени раскрываются буква за буквой.",
    features: ["Врата облаков", "Раскрытие имён", "Тёплая палитра"],
    tech: "Scroll-driven animation, CSS keyframes",
  },
  altyn: {
    name: "Altyn (Premium)",
    tagline: "Золотой орнамент на чёрном мраморе — казахская роскошь.",
    description: "Altyn — премиальный дизайн. Золотой орнамент светится на тёмных акцентных секциях, а типографика выдержана в стиле модного журнала.",
    features: ["Золотое сердце", "Тёмный акцент", "Три палитры"],
    tech: "3D heart, balloon burst, dark accent sections",
  },
  kazakh: {
    name: "Kazakh Ornament",
    tagline: "Традиционный орнамент — построенный с математической точностью.",
    description: "Kazakh Ornament — дизайн, близкий к корням. Узор построен на законах симметрии, вращения и зеркального повторения.",
    features: ["Симметрия орнамента", "Векторная точность", "Слои олетте"],
    tech: "Vector SVG, mathematical symmetry",
  },
};

export default async function ThemePage({ params }: { params: { slug: string } }) {
  const theme = themes[params.slug];
  if (!theme) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <a href="/" className="text-sm text-primary-500 hover:underline">← Все дизайны</a>
      <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">{theme.name}</h1>
      <p className="mt-2 text-xl text-muted-foreground italic">{theme.tagline}</p>

      <div className="mt-8 flex gap-3">
        <a href={`/create?theme=${params.slug}`} className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600">
          Создать с этим дизайном
        </a>
        <a href={`/i/demo-${params.slug}`} className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">
          Смотреть демо
        </a>
      </div>

      <div className="mt-12 rounded-2xl bg-card p-8 border border-border">
        <p className="text-muted-foreground leading-relaxed">{theme.description}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {theme.features.map((f, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
            <span className="text-2xl">{["1", "2", "3"][i]}</span>
            <p className="mt-2 font-medium text-foreground">{f}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">Технология: {theme.tech}</p>
    </div>
  );
}
