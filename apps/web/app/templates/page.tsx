"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Category {
  id: number;
  slug: string;
  name_ru: string;
  name_kk: string;
  cover_url: string;
  description_ru: string | null;
  template_count: number;
}

export default function TemplatesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <a href="/" className="text-sm text-primary-500 hover:underline">← Shaqyrtu</a>
      <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">Шаблоны</h1>
      <p className="mt-2 text-muted-foreground">Шаблоны цифровых пригласительных на казахские тои</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <a key={cat.id} href={`/templates/${cat.slug}`} className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
            <div className="relative aspect-video">
              <Image src={cat.cover_url} alt={cat.name_ru} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-foreground">{cat.name_ru}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{cat.description_ru || `${cat.template_count} шаблонов`}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
