"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  cardId: number;
  slug: string;
}

export function RsvpForm({ cardId, slug }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(attending: boolean) {
    if (!name.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/i/${slug}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card_id: cardId,
          guest_name: name,
          guest_phone: phone || null,
          guest_count: count,
          attending,
          message: message || null,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 p-6 text-center dark:bg-green-950/30">
        <p className="text-lg font-semibold text-green-700 dark:text-green-300">Спасибо за ответ!</p>
        <p className="mt-1 text-sm text-green-600 dark:text-green-400">Ваш ответ записан.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-display)]">Придёте?</h3>
      <Input placeholder="Ваше имя *" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Телефон (необязательно)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <div className="flex items-center gap-3">
        <label className="text-sm text-muted-foreground">Сколько человек?</label>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
      <textarea
        placeholder="Сообщение (необязательно)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex min-h-[80px] w-full rounded-lg border border-border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      />
      <div className="flex gap-3">
        <Button
          onClick={() => handleSubmit(true)}
          disabled={!name.trim() || loading}
          className="flex-1"
        >
          Приду ✓
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSubmit(false)}
          disabled={!name.trim() || loading}
          className="flex-1"
        >
          Не смогу
        </Button>
      </div>
    </div>
  );
}
