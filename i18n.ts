import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['ro', 'en'] as const;
export const defaultLocale = 'ro' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    return {
      locale: 'ro',
      messages: (await import(`./messages/ro.json`)).default
    };
  }
  return {
    locale: locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
}); 