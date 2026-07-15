"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TextGeneratorPage() {
  const [eventType, setEventType] = useState("wedding");
  const [language, setLanguage] = useState("ru");
  const [names, setNames] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/tools/text-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_type: eventType, language, names, date, time, address }),
      });
      const data = await res.json();
      setResult(data.text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <a href="/" className="text-sm text-primary-500 hover:underline">← Shaqyrtu</a>
      <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">Генератор текста приглашения</h1>
      <p className="mt-2 text-muted-foreground">Заполните поля — получите готовый текст для WhatsApp</p>

      <div className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Тип тоя</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm">
            <option value="wedding">Свадьба / Үйлену той</option>
            <option value="kyz_uzatu">Қыз ұзату</option>
            <option value="besik_toi">Бесік той</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Язык</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm">
            <option value="ru">Русский</option>
            <option value="kk">Қазақша</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Имена</label>
          <Input placeholder="Асылан и Диана" value={names} onChange={(e) => setNames(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Дата</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Время</label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Адрес</label>
          <Input placeholder="г. Астана, ресторан «Думан»" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <Button onClick={generate} disabled={loading} className="w-full">
          {loading ? "Генерация..." : "Сгенерировать текст"}
        </Button>
      </div>

      {result && (
        <div className="mt-8 rounded-2xl bg-card p-6 border border-border">
          <h3 className="mb-3 font-semibold text-foreground">Ваш текст</h3>
          <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{result}</pre>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => navigator.clipboard.writeText(result)}>
            Копировать текст
          </Button>
        </div>
      )}
    </div>
  );
}
