"use client";

import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      };
    }

    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-4 text-center">
      {[
        { value: timeLeft.days, label: "Дней" },
        { value: timeLeft.hours, label: "Часов" },
        { value: timeLeft.minutes, label: "Минут" },
        { value: timeLeft.seconds, label: "Секунд" },
      ].map((item, i) => (
        <div key={item.label} className="flex items-center gap-4">
          {i > 0 && <span className="text-2xl text-muted-foreground">|</span>}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground tabular-nums">{item.value}</span>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
