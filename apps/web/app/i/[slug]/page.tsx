import { notFound } from "next/navigation";
import { InvitationView } from "@/components/invitation/invitation-view";

async function getInvitation(slug: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/i/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getInvitation(slug);
  if (!data) notFound();

  return <InvitationView data={data} />;
}
