export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-[#14171a]" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.55] dark:opacity-[0.72]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 15% 8%, rgba(251, 146, 60, 0.045) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 88% 22%, rgba(99, 102, 241, 0.035) 0%, transparent 50%), radial-gradient(ellipse 65% 45% at 42% 92%, rgba(16, 185, 129, 0.03) 0%, transparent 48%)",
        }}
      />
      <div className="absolute -left-[12%] top-[6%] hidden h-[min(380px,52vh)] w-[min(380px,78vw)] rounded-full bg-orange-300/25 blur-[88px] lg:block" style={{ animation: "blob-a 22s ease-in-out infinite" }} />
      <div className="absolute -right-[8%] top-[38%] hidden h-[min(320px,44vh)] w-[min(320px,70vw)] rounded-full bg-violet-200/30 blur-[96px] lg:block" style={{ animation: "blob-b 28s ease-in-out infinite" }} />
      <div className="absolute bottom-[8%] left-[28%] hidden h-56 w-56 rounded-full bg-emerald-200/25 blur-[80px] lg:block" style={{ animation: "blob-c 26s ease-in-out infinite" }} />
    </div>
  );
}
