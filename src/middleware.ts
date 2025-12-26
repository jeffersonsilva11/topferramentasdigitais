import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export const locales = ['en', 'pt', 'es', 'fr', 'de', 'ru', 'it'] as const;
export const defaultLocale = 'en' as const;

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|pt|es|fr|de|ru|it)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
