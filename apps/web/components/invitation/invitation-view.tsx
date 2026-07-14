"use client";

import Image from "next/image";
import { CountdownTimer } from "./countdown";
import { RsvpForm } from "./rsvp-form";
import { MapPin, Calendar, Clock } from "lucide-react";

interface Props {
  data: {
    card: {
      id: number;
      title: string;
      slug: string;
      fields: Record<string, any>;
      photos: string[];
      music_url: string | null;
      schedule: { time: string; title: string }[];
      promo_code: string | null;
      theme: { slug: string; name: string } | null;
      category: { slug: string; name_ru: string } | null;
    };
    rsvp_stats: { total_invited: number; total_guests: number };
  };
}

export function InvitationView({ data }: Props) {
  const { card, rsvp_stats } = data;
  const fields = card.fields || {};

  return (
    <div className="min-h-dvh bg-gradient-to-b from-primary-50 to-white dark:from-primary-950/20 dark:to-background">
      {/* Cover Image */}
      {card.photos?.[0] && (
        <div className="relative h-[50vh] w-full">
          <Image src={card.photos[0]} alt={card.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">{card.title}</h1>
            {fields.event_name && <p className="mt-1 text-lg opacity-90">{fields.event_name}</p>}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-lg space-y-8 px-4 py-8">
        {/* Event Description */}
        {fields.description && (
          <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
            <p className="text-center text-muted-foreground leading-relaxed">{fields.description}</p>
          </div>
        )}

        {/* Date & Time */}
        {fields.date && (
          <div className="flex items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary-500" />
              <span className="font-medium">{fields.date}</span>
            </div>
            {fields.time && (
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-primary-500" />
                <span className="font-medium">{fields.time}</span>
              </div>
            )}
          </div>
        )}

        {/* Countdown */}
        {fields.date && (
          <CountdownTimer targetDate={`${fields.date}T${fields.time || "18:00"}:00`} />
        )}

        {/* Venue */}
        {fields.venue && (
          <div className="rounded-2xl bg-card p-4 shadow-sm border border-border">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
              <div>
                <p className="font-medium text-foreground">{fields.venue}</p>
                {fields.venue_map_url && (
                  <a href={fields.venue_map_url} target="_blank" rel="noopener" className="mt-1 inline-block text-sm text-primary-500 hover:underline">
                    Открыть на карте →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hosts */}
        {fields.hosts && fields.hosts.length > 0 && (
          <div className="text-center">
            <p className="mb-3 text-sm uppercase tracking-wider text-muted-foreground">Хозяева</p>
            <div className="flex justify-center gap-8">
              {fields.hosts.map((host: string, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                    {host[0]}
                  </div>
                  <p className="mt-2 font-medium text-foreground">{host}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule */}
        {card.schedule && card.schedule.length > 0 && (
          <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
            <h3 className="mb-4 text-lg font-semibold text-foreground font-[family-name:var(--font-display)]">Программа</h3>
            <div className="space-y-3">
              {card.schedule.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 rounded-lg bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-600 tabular-nums dark:bg-primary-900/30 dark:text-primary-400">
                    {item.time}
                  </span>
                  <p className="text-sm text-foreground">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP Stats */}
        <div className="flex items-center justify-center gap-4 text-center text-sm text-muted-foreground">
          <span>Приглашено: <strong className="text-foreground">{rsvp_stats.total_invited}</strong></span>
          <span>•</span>
          <span>Гостей: <strong className="text-foreground">{rsvp_stats.total_guests}</strong></span>
        </div>

        {/* RSVP Form */}
        <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
          <RsvpForm cardId={card.id} slug={card.slug} />
        </div>

        {/* Promo */}
        {card.promo_code && (
          <a
            href={`/?promo=${card.promo_code}`}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-4 text-center text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            <span className="font-semibold">Создать со скидкой -30%</span>
          </a>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Сделано с <a href="https://shaqyrtu.kz" className="underline hover:text-foreground">shaqyrtu.kz</a>
        </p>
      </div>
    </div>
  );
}
