"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  slug: string;
  name_ru: string;
  cover_url: string;
  template_count: number;
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/v1/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  if (categories.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`/templates/${cat.slug}`}
          className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl"
        >
          <img
            src={cat.cover_url}
            alt={cat.name_ru}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-3">
            <h4 className="text-sm font-semibold text-white drop-shadow-md">{cat.name_ru}</h4>
            <div className="mt-1 flex items-center justify-between">
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium text-white/90">
                {cat.template_count} шаблонов
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white text-xs">
                →
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
