export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith('/ru')) {
    return 'ru';
  }
  return 'en';
}
