"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
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
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/80 px-0 py-3 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <a href="/" className="flex items-center gap-2 text-sm font-bold">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
          S
        </div>
        <span className="font-mono text-sm tracking-wider">shaqyrtu.kz</span>
      </a>
      <div className="flex items-center gap-2">
        <div className="flex rounded-full bg-gray-100 p-0.5 dark:bg-gray-800">
          {["KZ", "RU"].map((lang) => (
            <button
              key={lang}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                lang === "RU"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <button
          onClick={toggle}
          className="rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
