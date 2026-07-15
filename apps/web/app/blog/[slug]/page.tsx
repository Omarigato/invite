import { notFound } from "next/navigation";

async function getPost(slug: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/blog/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <a href="/blog" className="text-sm text-indigo-500 hover:underline">← Блог</a>
      <div className="mt-4">
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {post.locale === "ru" ? "Русский" : post.locale === "kk" ? "Қазақша" : "English"}
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
      <div className="prose prose-gray mt-8 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.body }} />
      <div className="mt-12 rounded-2xl bg-indigo-50 p-6 text-center dark:bg-indigo-950/20">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Хотите красивее?</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Добавьте фото, карту и RSVP — в Shaqyrtu это займёт 5 минут</p>
        <a href="/" className="mt-4 inline-block rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-600">
          Создать приглашение →
        </a>
      </div>
    </div>
  );
}
