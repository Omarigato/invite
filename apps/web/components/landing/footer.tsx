export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-3 px-4">
        <p className="font-medium text-gray-700 dark:text-gray-300">Сделано с shaqyrtu.kz</p>
        <div className="flex justify-center gap-6">
          <a href="/blog" className="hover:text-gray-900 dark:hover:text-white">Блог</a>
          <a href="/terms" className="hover:text-gray-900 dark:hover:text-white">Условия</a>
          <a href="https://www.instagram.com/shaqyrtu.service/" target="_blank" rel="noopener" className="hover:text-gray-900 dark:hover:text-white">Instagram</a>
        </div>
        <p className="text-xs text-gray-400">© 2026 Shaqyrtu</p>
      </div>
    </footer>
  );
}
