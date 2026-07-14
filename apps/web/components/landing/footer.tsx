export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
      <div className="mx-auto max-w-screen-xl space-y-2">
        <p>Сделано с shaqyrtu.kz</p>
        <div className="flex justify-center gap-4">
          <a href="/blog" className="hover:text-foreground transition-colors">Блог</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Условия</a>
          <a href="https://www.instagram.com/shaqyrtu.service/" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">Instagram</a>
        </div>
        <p className="text-xs">© 2026 Shaqyrtu — made by abmco.kz</p>
      </div>
    </footer>
  );
}
