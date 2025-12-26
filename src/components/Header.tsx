'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <span className="text-2xl">🛠️</span>
            <div>
              <h1 className="text-xl font-bold text-primary-600">Ferramentas Digitais</h1>
              <p className="text-xs text-gray-500">Utilitários online gratuitos</p>
            </div>
          </Link>

          {!isHome && (
            <Link
              href="/"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              ← Voltar para Home
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
