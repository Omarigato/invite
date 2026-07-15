import { notFound } from "next/navigation";

const themes: Record<string, { name: string; tagline: string; description: string; features: string[]; tech: string }> = {
  floral: {
    name: "Floral",
    tagline: "Цветы на экране — не картинка. Они растут на вашем GPU.",
    description: "Floral — это WebGL-дизайн. Цветы не являются изображением или GIF: они отрисовываются процедурно и растут в реальном времени на GPU вашего устройства.",
    features: ["Живая лента", "Букет RSVP", "Замкнутый цикл"],
    tech: "Three.js, GLSL shaders",
  },
  daylight: {
    name: "Daylight",
    tagline: "Небо открывается, солнце восходит — затем имена загораются.",
    description: "Daylight — это дизайн о свете и радости. Когда вы открываете приглашение, облака раздвигаются и небо открывается.",
    features: ["Врата облаков", "Раскрытие имён", "Тёплая палитра"],
    tech: "Scroll-driven animation",
  },
  altyn: {
    name: "Altyn (Premium)",
    tagline: "Золотой орнамент на чёрном мраморе — казахская роскошь.",
    description: "Altyn — премиальный дизайн. Золотой орнамент светится на тёмных акцентных секциях.",
    features: ["Золотое сердце", "Тёмный акцент", "Три палитры"],
    tech: "3D heart, balloon burst",
  },
  kazakh: {
    name: "Kazakh Ornament",
    tagline: "Традиционный орнамент — построенный с математической точностью.",
    description: "Kazakh Ornament — дизайн, близкий к корням. Узор построен на законах симметрии.",
    features: ["Симметрия орнамента", "Векторная точность", "Слои олетте"],
    tech: "Vector SVG, mathematical symmetry",
  },
};

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = themes[slug];
  if (!theme) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <a href="/" className="text-sm text-indigo-500 hover:underline">← Все дизайны</a>
      <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{theme.name}</h1>
      <p className="mt-2 text-xl text-gray-500 italic">{theme.tagline}</p>

      <div className="mt-8 flex gap-3">
        <a href={`/create?theme=${slug}`} className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600">
          Создать с этим дизайном
        </a>
        <a href={`/i/demo-${slug}`} className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          Смотреть демо
        </a>
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-600 leading-relaxed dark:text-gray-400">{theme.description}</p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {theme.features.map((f, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
            <span className="text-2xl font-bold text-indigo-500">{i + 1}</span>
            <p className="mt-2 font-medium text-gray-900 dark:text-white">{f}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-400">Технология: {theme.tech}</p>
    </div>
  );
}
