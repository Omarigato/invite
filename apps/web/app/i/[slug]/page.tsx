import { notFound } from "next/navigation";
import { InvitationView } from "@/components/invitation/invitation-view";

async function getInvitation(slug: string) {
  const res = await fetch(`http://localhost:8000/api/v1/i/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = await getInvitation(params.slug);
  if (!data) return { title: "Приглашение не найдено" };
  return {
    title: `${data.card.title} — Shaqyrtu`,
    description: data.card.fields?.description || "Онлайн-приглашение",
    openGraph: { title: data.card.title, images: data.card.photos?.[0] ? [data.card.photos[0]] : [] },
  };
}

export default async function InvitationPage({ params }: { params: { slug: string } }) {
  const data = await getInvitation(params.slug);
  if (!data) notFound();

  return <InvitationView data={data} />;
}
