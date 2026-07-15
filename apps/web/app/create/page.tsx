"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Template {
  id: number;
  name: string;
  category_id: number;
  theme_id: number;
  is_premium: boolean;
}

export default function CreatePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [step, setStep] = useState(1);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/templates")
      .then((r) => r.json())
      .then(setTemplates)
      .catch(console.error);
  }, []);

  async function handleAuth() {
    // Simplified auth flow
    const phone = prompt("Введите номер телефона:");
    if (!phone) return;

    await fetch("/api/v1/auth/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const code = prompt("Введите код (в dev: 123456):");
    if (!code) return;

    const res = await fetch(`/api/v1/auth/verify-otp?phone=${encodeURIComponent(phone)}&code=${code}`);
    const data = await res.json();
    setToken(data.access_token);
  }

  async function createCard() {
    if (!selectedTemplate || !title) return;
    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return;

    const res = await fetch("/api/v1/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        template_id: template.id,
        theme_id: template.theme_id,
        category_id: template.category_id,
        title,
      }),
    });

    if (res.ok) {
      const card = await res.json();
      alert(`Карточка создана! Ссылка: /i/${card.slug}`);
    }
  }

  if (!token) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Создать приглашение</h1>
          <p className="mt-2 text-muted-foreground">Войдите, чтобы начать</p>
          <Button onClick={handleAuth} className="mt-6">Войти по телефону</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Новое приглашение</h1>

      {step === 1 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Шаг 1: Выберите шаблон</h2>
          <div className="grid grid-cols-2 gap-3">
            {templates.slice(0, 12).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`rounded-xl border p-4 text-left text-sm transition-all ${
                  selectedTemplate === t.id
                    ? "border-primary-500 bg-primary-50 shadow-md"
                    : "border-border hover:border-primary-300"
                }`}
              >
                {t.name}
                {t.is_premium && <span className="ml-1 text-xs text-yellow-600">★</span>}
              </button>
            ))}
          </div>
          <Button onClick={() => setStep(2)} disabled={!selectedTemplate} className="w-full">
            Далее
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold">Шаг 2: Название</h2>
          <Input placeholder="Например: Свадьба Асылан и Диана" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Назад</Button>
            <Button onClick={createCard} disabled={!title} className="flex-1">Создать</Button>
          </div>
        </div>
      )}
    </div>
  );
}
