"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Category {
  id: number;
  slug: string;
  name_ru: string;
  name_kk: string;
  cover_url: string;
  template_count: number;
}

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
      {categories.map((cat) => (
        <a
          key={cat.id}
          href={`/templates/${cat.slug}`}
          className="group relative aspect-[4/5] block w-full overflow-hidden rounded-2xl text-left no-underline shadow-[0_4px_24px_-6px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] active:scale-[0.98] sm:rounded-[1.25rem]"
        >
          <Image
            src={cat.cover_url}
            alt={cat.name_ru}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 50vw, 300px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition-opacity duration-300 group-hover:from-black/85" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-3 sm:p-3.5">
            <h4 className="line-clamp-2 text-[15px] font-semibold leading-[1.2] tracking-[-0.02em] text-white drop-shadow-md sm:text-[17px] font-[family-name:var(--font-display)]">
              {cat.name_ru}
            </h4>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-md sm:text-[11px]">
                {cat.template_count} шаблонов
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/25 text-white opacity-80 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
