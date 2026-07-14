import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const res = await fetch(`http://localhost:8000/api/v1/blog/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <a href="/blog" className="text-sm text-primary-500 hover:underline">← Блог</a>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-primary-700 font-medium">
          {post.locale === "ru" ? "Русский" : post.locale === "kk" ? "Қазақша" : "English"}
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">{post.title}</h1>
      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.body }} />
      <div className="mt-12 rounded-2xl bg-primary-50 p-6 text-center dark:bg-primary-950/20">
        <p className="text-lg font-semibold">Хотите красивее?</p>
        <p className="mt-1 text-sm text-muted-foreground">Добавьте фото, карту и RSVP — в Shaqyrtu это займёт 5 минут</p>
        <a href="/" className="mt-4 inline-block rounded-full bg-primary-500 px-6 py-2 text-sm font-semibold text-white hover:bg-primary-600">
          Создать приглашение →
        </a>
      </div>
    </div>
  );
}
