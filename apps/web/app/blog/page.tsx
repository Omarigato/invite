"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Post {
  id: number;
  slug: string;
  title: string;
  locale: string;
  excerpt: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/blog")
      .then((r) => r.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <a href="/" className="text-sm text-primary-500 hover:underline">← Shaqyrtu</a>
      <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">Блог</h1>
      <p className="mt-2 text-muted-foreground">Статьи о казахских тои и онлайн-приглашениях</p>
      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <a key={post.id} href={`/blog/${post.slug}`} className="block rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-primary-700 font-medium dark:bg-primary-900/30 dark:text-primary-300">
                {post.locale === "ru" ? "Русский" : post.locale === "kk" ? "Қазақша" : "English"}
              </span>
              <span>{format(new Date(post.created_at), "d MMMM yyyy")}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-foreground">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
