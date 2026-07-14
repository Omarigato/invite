"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-20 -mx-4 flex items-center justify-between border-b border-border/50 bg-[var(--background)]/80 px-4 py-2.5 backdrop-blur-md sm:-mx-5 sm:px-5 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none mb-4 lg:mb-8">
      <a href="/" className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight sm:text-lg">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white sm:h-8 sm:w-8">
          S
        </div>
        <span className="whitespace-pre-line font-mono lowercase sm:tracking-widest">shaqyrtu.kz</span>
      </a>
      <div className="flex items-center gap-2">
        {/* Language tabs */}
        <div className="flex w-28 items-center gap-0 rounded-full bg-muted p-1 sm:w-36">
          {["KZ", "RU"].map((lang) => (
            <button
              key={lang}
              className={`flex-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors ${
                lang === "RU" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        {/* Dark mode toggle */}
        <button onClick={toggle} className="rounded-2xl p-1.5 text-muted-foreground hover:bg-muted lg:flex hidden">
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
